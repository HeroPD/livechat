%% Created automatically by XML generator (fxml_gen.erl)
%% Source: mod_live_codec.spec

-record(chat_info, {key = <<>> :: binary(),
                    cdata = <<>> :: binary()}).
-type chat_info() :: #chat_info{}.

-record(chat_create, {items = [] :: [#chat_info{}]}).
-type chat_create() :: #chat_create{}.

-type xmpp_element() :: chat_info() |
                        chat_create().
