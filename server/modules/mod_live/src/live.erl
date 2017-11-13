%% Created automatically by XML generator (fxml_gen.erl)
%% Source: mod_live_codec.spec

-module(live).

-compile(export_all).

do_decode(<<"chat-create">>, <<"mod:live:chat">>, El,
	  Opts) ->
    decode_chat_create(<<"mod:live:chat">>, Opts, El);
do_decode(<<"item">>, <<"mod:live:chat">>, El, Opts) ->
    decode_chat_info(<<"mod:live:chat">>, Opts, El);
do_decode(Name, <<>>, _, _) ->
    erlang:error({mod_live_codec,
		  {missing_tag_xmlns, Name}});
do_decode(Name, XMLNS, _, _) ->
    erlang:error({mod_live_codec,
		  {unknown_tag, Name, XMLNS}}).

tags() ->
    [{<<"chat-create">>, <<"mod:live:chat">>},
     {<<"item">>, <<"mod:live:chat">>}].

do_encode({chat_info, _, _} = Item, TopXMLNS) ->
    encode_chat_info(Item, TopXMLNS);
do_encode({chat_create, _} = Chat_create, TopXMLNS) ->
    encode_chat_create(Chat_create, TopXMLNS).

do_get_name({chat_create, _}) -> <<"chat-create">>;
do_get_name({chat_info, _, _}) -> <<"item">>.

do_get_ns({chat_create, _}) -> <<"mod:live:chat">>;
do_get_ns({chat_info, _, _}) -> <<"mod:live:chat">>.

pp(chat_info, 2) -> [key, cdata];
pp(chat_create, 1) -> [items];
pp(_, _) -> no.

records() -> [{chat_info, 2}, {chat_create, 1}].

decode_chat_create(__TopXMLNS, __Opts,
		   {xmlel, <<"chat-create">>, _attrs, _els}) ->
    Items = decode_chat_create_els(__TopXMLNS, __Opts, _els,
				   []),
    {chat_create, Items}.

decode_chat_create_els(__TopXMLNS, __Opts, [], Items) ->
    lists:reverse(Items);
decode_chat_create_els(__TopXMLNS, __Opts,
		       [{xmlel, <<"item">>, _attrs, _} = _el | _els], Items) ->
    case mod_live_codec:get_attr(<<"xmlns">>, _attrs,
				 __TopXMLNS)
	of
      <<"mod:live:chat">> ->
	  decode_chat_create_els(__TopXMLNS, __Opts, _els,
				 [decode_chat_info(<<"mod:live:chat">>, __Opts,
						   _el)
				  | Items]);
      _ ->
	  decode_chat_create_els(__TopXMLNS, __Opts, _els, Items)
    end;
decode_chat_create_els(__TopXMLNS, __Opts, [_ | _els],
		       Items) ->
    decode_chat_create_els(__TopXMLNS, __Opts, _els, Items).

encode_chat_create({chat_create, Items}, __TopXMLNS) ->
    __NewTopXMLNS =
	mod_live_codec:choose_top_xmlns(<<"mod:live:chat">>, [],
					__TopXMLNS),
    _els = lists:reverse('encode_chat_create_$items'(Items,
						     __NewTopXMLNS, [])),
    _attrs = mod_live_codec:enc_xmlns_attrs(__NewTopXMLNS,
					    __TopXMLNS),
    {xmlel, <<"chat-create">>, _attrs, _els}.

'encode_chat_create_$items'([], __TopXMLNS, _acc) ->
    _acc;
'encode_chat_create_$items'([Items | _els], __TopXMLNS,
			    _acc) ->
    'encode_chat_create_$items'(_els, __TopXMLNS,
				[encode_chat_info(Items, __TopXMLNS) | _acc]).

decode_chat_info(__TopXMLNS, __Opts,
		 {xmlel, <<"item">>, _attrs, _els}) ->
    Cdata = decode_chat_info_els(__TopXMLNS, __Opts, _els,
				 <<>>),
    Key = decode_chat_info_attrs(__TopXMLNS, _attrs,
				 undefined),
    {chat_info, Key, Cdata}.

decode_chat_info_els(__TopXMLNS, __Opts, [], Cdata) ->
    decode_chat_info_cdata(__TopXMLNS, Cdata);
decode_chat_info_els(__TopXMLNS, __Opts,
		     [{xmlcdata, _data} | _els], Cdata) ->
    decode_chat_info_els(__TopXMLNS, __Opts, _els,
			 <<Cdata/binary, _data/binary>>);
decode_chat_info_els(__TopXMLNS, __Opts, [_ | _els],
		     Cdata) ->
    decode_chat_info_els(__TopXMLNS, __Opts, _els, Cdata).

decode_chat_info_attrs(__TopXMLNS,
		       [{<<"key">>, _val} | _attrs], _Key) ->
    decode_chat_info_attrs(__TopXMLNS, _attrs, _val);
decode_chat_info_attrs(__TopXMLNS, [_ | _attrs], Key) ->
    decode_chat_info_attrs(__TopXMLNS, _attrs, Key);
decode_chat_info_attrs(__TopXMLNS, [], Key) ->
    decode_chat_info_attr_key(__TopXMLNS, Key).

encode_chat_info({chat_info, Key, Cdata}, __TopXMLNS) ->
    __NewTopXMLNS =
	mod_live_codec:choose_top_xmlns(<<"mod:live:chat">>, [],
					__TopXMLNS),
    _els = encode_chat_info_cdata(Cdata, []),
    _attrs = encode_chat_info_attr_key(Key,
				       mod_live_codec:enc_xmlns_attrs(__NewTopXMLNS,
								      __TopXMLNS)),
    {xmlel, <<"item">>, _attrs, _els}.

decode_chat_info_attr_key(__TopXMLNS, undefined) ->
    <<>>;
decode_chat_info_attr_key(__TopXMLNS, _val) -> _val.

encode_chat_info_attr_key(<<>>, _acc) -> _acc;
encode_chat_info_attr_key(_val, _acc) ->
    [{<<"key">>, _val} | _acc].

decode_chat_info_cdata(__TopXMLNS, <<>>) -> <<>>;
decode_chat_info_cdata(__TopXMLNS, _val) -> _val.

encode_chat_info_cdata(<<>>, _acc) -> _acc;
encode_chat_info_cdata(_val, _acc) ->
    [{xmlcdata, _val} | _acc].
