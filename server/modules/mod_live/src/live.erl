%% Created automatically by XML generator (fxml_gen.erl)
%% Source: mod_live_codec.spec

-module(live).

-compile(export_all).

do_decode(<<"chat-create">>, <<"mod:live:chat">>, El,
	  Opts) ->
    decode_chat_create(<<"mod:live:chat">>, Opts, El);
do_decode(Name, <<>>, _, _) ->
    erlang:error({mod_live_codec,
		  {missing_tag_xmlns, Name}});
do_decode(Name, XMLNS, _, _) ->
    erlang:error({mod_live_codec,
		  {unknown_tag, Name, XMLNS}}).

tags() -> [{<<"chat-create">>, <<"mod:live:chat">>}].

do_encode({chat_create, _} = Chat_create, TopXMLNS) ->
    encode_chat_create(Chat_create, TopXMLNS).

do_get_name({chat_create, _}) -> <<"chat-create">>.

do_get_ns({chat_create, _}) -> <<"mod:live:chat">>.

pp(chat_create, 1) -> [data];
pp(_, _) -> no.

records() -> [{chat_create, 1}].

decode_chat_create(__TopXMLNS, __Opts,
		   {xmlel, <<"chat-create">>, _attrs, _els}) ->
    Data = decode_chat_create_attrs(__TopXMLNS, _attrs,
				    undefined),
    {chat_create, Data}.

decode_chat_create_attrs(__TopXMLNS,
			 [{<<"data">>, _val} | _attrs], _Data) ->
    decode_chat_create_attrs(__TopXMLNS, _attrs, _val);
decode_chat_create_attrs(__TopXMLNS, [_ | _attrs],
			 Data) ->
    decode_chat_create_attrs(__TopXMLNS, _attrs, Data);
decode_chat_create_attrs(__TopXMLNS, [], Data) ->
    decode_chat_create_attr_data(__TopXMLNS, Data).

encode_chat_create({chat_create, Data}, __TopXMLNS) ->
    __NewTopXMLNS =
	mod_live_codec:choose_top_xmlns(<<"mod:live:chat">>, [],
					__TopXMLNS),
    _els = [],
    _attrs = encode_chat_create_attr_data(Data,
					  mod_live_codec:enc_xmlns_attrs(__NewTopXMLNS,
									 __TopXMLNS)),
    {xmlel, <<"chat-create">>, _attrs, _els}.

decode_chat_create_attr_data(__TopXMLNS, undefined) ->
    <<>>;
decode_chat_create_attr_data(__TopXMLNS, _val) -> _val.

encode_chat_create_attr_data(<<>>, _acc) -> _acc;
encode_chat_create_attr_data(_val, _acc) ->
    [{<<"data">>, _val} | _acc].
