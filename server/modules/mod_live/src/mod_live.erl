-module(mod_live).

-behaviour(gen_mod).

-export([start/2, 
  stop/1, 
  depends/2,
  mod_opt_type/1]).

-export([process_local_iq/1]).

-include("ejabberd.hrl").
-include("logger.hrl").
-include("xmpp.hrl").
-include("mod_live_codec.hrl").

-define(NS_MODLIVE, <<"jabber:live:chat">>).

% -callback init(binary(), gen_mod:opts()) -> any().
% -callback createchat(any(), jid()) -> any().

start(Host, Opts) ->
  ?INFO_MSG("mod_live start : host ~p opts - ~p", [Host, Opts]),
  xmpp:register_codec(live),
  IQDisc = gen_mod:get_opt(iqdisc, Opts, fun gen_iq_handler:check_type/1, one_queue),
  Mod = gen_mod:db_mod(Host, Opts, ?MODULE),
  Mod:init(Host, Opts),
  gen_iq_handler:add_iq_handler(ejabberd_local, Host, ?NS_MODLIVE, ?MODULE, process_local_iq, IQDisc),
  ok.

stop(Host) ->
  ?INFO_MSG("shutting down mod_live ~p", [Host]),
  ok.

process_local_iq(#iq{type='set', sub_els = [#chat_create{data = Data}]} = IQ) when is_binary(Data) ->
  From = IQ#iq.from,
	Mod = gen_mod:db_mod(mnesia, ?MODULE),
	Token = Mod:createchat(Data, From),
  xmpp:make_iq_result(IQ,
    #xmlel{
      name = <<"create">>,
      attrs = [
        {<<"xmlns">>, ?NS_MODLIVE},
        {<<"token">>, Token}
      ],
      children = [{xmlcdata,<<"succesfull">>}]
    }
  );
% process_local_iq(From, _, #iq{type='set', sub_el = #xmlel{name = <<"join>>">>, attrs = Attrs} = Sub_el} = IQ) ->
% 	Mod = gen_mod:db_mod(mnesia, ?MODULE),
% 	IQ#iq{type = result,
% 				sub_el = [
% 					#xmlel{
% 						name = <<"join">>,
% 						attrs = [
% 							{<<"xmlns">>, ?NS_MODLIVE},
% 							{<<"token">>, Token}
% 						],
% 						children = [{xmlcdata,<<"succesfull">>}]
% 					}
% 				]
% 			};
process_local_iq(IQ) ->
	xmpp:make_error(IQ, xmpp:err_forbidden()).

depends(_Host, _Opts) ->
  [].

mod_opt_type(db_type) -> fun(T) -> ejabberd_config:v_db(?MODULE, T) end;
mod_opt_type(iqdisc) -> fun gen_iq_handler:check_type/1;
mod_opt_type(_) -> [db_type, iqdisc].
