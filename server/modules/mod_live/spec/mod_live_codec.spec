% -xml(chat_info, #elem{
% 	name = <<"item">>,
% 	xmlns = <<"mod:live:chat">>,
% 	module = live,
% 	result = {chat_info , '$key', '$cdata'},
% 	attrs = [#attr{name = <<"key">>, label = '$key', default = <<"">>}],
% 	cdata = #cdata{label = '$cdata'}
% 	}).

% -xml(chat_create, #elem{
% 	name = <<"chat-create">>,
% 	xmlns = <<"mod:live:chat">>,
% 	module = live,
% 	result = {chat_create , '$items'},
% 	refs = [#ref{name = chat_info, label = '$items'}]
% 	}).

-xml(chat_create, #elem{
	name = <<"chat-create">>,
	xmlns = <<"mod:live:chat">>,
	module = live,
	result = {chat_create , '$data'},
	attrs = [#attr{name = <<"data">>, label = '$data', default = <<"">>}]
	}).