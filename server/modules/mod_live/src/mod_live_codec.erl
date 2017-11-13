%% Created automatically by XML generator (fxml_gen.erl)
%% Source: mod_live_codec.spec

-module(mod_live_codec).

-compile(export_all).

decode(El) -> decode(El, <<>>, []).

decode(El, Opts) -> decode(El, <<>>, Opts).

decode({xmlel, Name, Attrs, _} = El, TopXMLNS, Opts) ->
    XMLNS = get_attr(<<"xmlns">>, Attrs, TopXMLNS),
    case get_mod(Name, XMLNS) of
      undefined when XMLNS == <<>> ->
	  erlang:error({mod_live_codec,
			{missing_tag_xmlns, Name}});
      undefined ->
	  erlang:error({mod_live_codec,
			{unknown_tag, Name, XMLNS}});
      Mod -> Mod:do_decode(Name, XMLNS, El, Opts)
    end.

encode(El) -> encode(El, <<>>).

encode({xmlel, _, _, _} = El, _) -> El;
encode(El, TopXMLNS) ->
    Mod = get_mod(El), Mod:do_encode(El, TopXMLNS).

get_name(El) -> Mod = get_mod(El), Mod:do_get_name(El).

get_ns(El) -> Mod = get_mod(El), Mod:do_get_ns(El).

is_known_tag({xmlel, Name, Attrs, _}, TopXMLNS) ->
    XMLNS = get_attr(<<"xmlns">>, Attrs, TopXMLNS),
    get_mod(Name, XMLNS) /= undefined.

pp(Term) ->
    case get_mod(Term) of
      undefined ->
	  io_lib_pretty:print(Term, fun (_, _) -> no end);
      Mod -> io_lib_pretty:print(Term, fun Mod:pp/2)
    end.

do_decode(Name, <<>>, _, _) ->
    erlang:error({mod_live_codec,
		  {missing_tag_xmlns, Name}});
do_decode(Name, XMLNS, _, _) ->
    erlang:error({mod_live_codec,
		  {unknown_tag, Name, XMLNS}}).

tags() -> [].

register_module(Mod) ->
    register_module(Mod, mod_live_codec_external).

unregister_module(Mod) ->
    unregister_module(Mod, mod_live_codec_external).

format_error({bad_attr_value, Attr, Tag, XMLNS}) ->
    <<"Bad value of attribute '", Attr/binary, "' in tag <",
      Tag/binary, "/> qualified by namespace '", XMLNS/binary,
      "'">>;
format_error({bad_cdata_value, <<>>, Tag, XMLNS}) ->
    <<"Bad value of cdata in tag <", Tag/binary,
      "/> qualified by namespace '", XMLNS/binary, "'">>;
format_error({missing_tag, Tag, XMLNS}) ->
    <<"Missing tag <", Tag/binary,
      "/> qualified by namespace '", XMLNS/binary, "'">>;
format_error({missing_attr, Attr, Tag, XMLNS}) ->
    <<"Missing attribute '", Attr/binary, "' in tag <",
      Tag/binary, "/> qualified by namespace '", XMLNS/binary,
      "'">>;
format_error({missing_cdata, <<>>, Tag, XMLNS}) ->
    <<"Missing cdata in tag <", Tag/binary,
      "/> qualified by namespace '", XMLNS/binary, "'">>;
format_error({unknown_tag, Tag, XMLNS}) ->
    <<"Unknown tag <", Tag/binary,
      "/> qualified by namespace '", XMLNS/binary, "'">>;
format_error({missing_tag_xmlns, Tag}) ->
    <<"Missing namespace for tag <", Tag/binary, "/>">>.

io_format_error({bad_attr_value, Attr, Tag, XMLNS}) ->
    {<<"Bad value of attribute '~s' in tag <~s/> "
       "qualified by namespace '~s'">>,
     [Attr, Tag, XMLNS]};
io_format_error({bad_cdata_value, <<>>, Tag, XMLNS}) ->
    {<<"Bad value of cdata in tag <~s/> qualified "
       "by namespace '~s'">>,
     [Tag, XMLNS]};
io_format_error({missing_tag, Tag, XMLNS}) ->
    {<<"Missing tag <~s/> qualified by namespace "
       "'~s'">>,
     [Tag, XMLNS]};
io_format_error({missing_attr, Attr, Tag, XMLNS}) ->
    {<<"Missing attribute '~s' in tag <~s/> "
       "qualified by namespace '~s'">>,
     [Attr, Tag, XMLNS]};
io_format_error({missing_cdata, <<>>, Tag, XMLNS}) ->
    {<<"Missing cdata in tag <~s/> qualified "
       "by namespace '~s'">>,
     [Tag, XMLNS]};
io_format_error({unknown_tag, Tag, XMLNS}) ->
    {<<"Unknown tag <~s/> qualified by namespace "
       "'~s'">>,
     [Tag, XMLNS]};
io_format_error({missing_tag_xmlns, Tag}) ->
    {<<"Missing namespace for tag <~s/>">>, [Tag]}.

get_attr(Attr, Attrs, Default) ->
    case lists:keyfind(Attr, 1, Attrs) of
      {_, Val} -> Val;
      false -> Default
    end.

enc_xmlns_attrs(XMLNS, XMLNS) -> [];
enc_xmlns_attrs(XMLNS, _) -> [{<<"xmlns">>, XMLNS}].

choose_top_xmlns(<<>>, NSList, TopXMLNS) ->
    case lists:member(TopXMLNS, NSList) of
      true -> TopXMLNS;
      false -> hd(NSList)
    end;
choose_top_xmlns(XMLNS, _, _) -> XMLNS.

register_module(Mod, ResolverMod) ->
    MD5Sum = try Mod:module_info(md5) of
	       Val -> Val
	     catch
	       error:badarg ->
		   {ok, {Mod, Val}} = beam_lib:md5(code:which(Mod)), Val
	     end,
    case orddict:find(Mod, ResolverMod:modules()) of
      {ok, MD5Sum} -> ok;
      _ ->
	  Mods = orddict:store(Mod, MD5Sum,
			       ResolverMod:modules()),
	  recompile_resolver(Mods, ResolverMod)
    end.

unregister_module(Mod, ResolverMod) ->
    case orddict:find(Mod, ResolverMod:modules()) of
      {ok, _} ->
	  Mods = orddict:erase(Mod, ResolverMod:modules()),
	  recompile_resolver(Mods, ResolverMod);
      error -> ok
    end.

recompile_resolver(Mods, ResolverMod) ->
    Tags = lists:flatmap(fun (M) ->
				 [{Name, XMLNS, M} || {Name, XMLNS} <- M:tags()]
			 end,
			 orddict:fetch_keys(Mods)),
    Records = lists:flatmap(fun (M) ->
				    [{RecName, RecSize, M}
				     || {RecName, RecSize} <- M:records()]
			    end,
			    orddict:fetch_keys(Mods)),
    Lookup1 = string:join(lists:map(fun ({RecName, RecSize,
					  M}) ->
					    io_lib:format("lookup({~s}) -> '~s'",
							  [string:join([io_lib:format("'~s'",
										      [RecName])
									| ["_"
									   || _
										  <- lists:seq(1,
											       RecSize)]],
								       ","),
							   M])
				    end,
				    Records)
			    ++ ["lookup(_) -> undefined."],
			  ";" ++ io_lib:nl()),
    Lookup2 = string:join(lists:map(fun ({Name, XMLNS,
					  M}) ->
					    io_lib:format("lookup(~w, ~w) -> '~s'",
							  [Name, XMLNS, M])
				    end,
				    Tags)
			    ++ ["lookup(_, _) -> undefined."],
			  ";" ++ io_lib:nl()),
    Modules = io_lib:format("modules() -> [~s].",
			    [string:join([io_lib:format("{'~s', ~w}", [M, S])
					  || {M, S} <- Mods],
					 ",")]),
    Module = io_lib:format("-module(~s).", [ResolverMod]),
    Compile = "-compile(export_all).",
    Forms = lists:map(fun (Expr) ->
			      {ok, Tokens, _} =
				  erl_scan:string(lists:flatten(Expr)),
			      {ok, Form} = erl_parse:parse_form(Tokens),
			      Form
		      end,
		      [Module, Compile, Modules, Lookup1, Lookup2]),
    {ok, Code} = case compile:forms(Forms, []) of
		   {ok, ResolverMod, Bin} -> {ok, Bin};
		   {ok, ResolverMod, Bin, _Warnings} -> {ok, Bin};
		   Error -> Error
		 end,
    {module, ResolverMod} = code:load_binary(ResolverMod,
					     "nofile", Code),
    ok.

records() -> [].

get_mod(<<"chat-create">>, <<"mod:live:chat">>) -> live;
get_mod(<<"item">>, <<"mod:live:chat">>) -> live;
get_mod(Name, XMLNS) ->
    mod_live_codec_external:lookup(Name, XMLNS).

get_mod({chat_create, _}) -> live;
get_mod({chat_info, _, _}) -> live;
get_mod(Record) ->
    mod_live_codec_external:lookup(Record).
