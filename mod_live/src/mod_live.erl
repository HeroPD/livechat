-module(mod_live).

-behaviour(gen_mod).

-export([start/2, 
  stop/1, 
  depends/2,
  mod_opt_type/1]).

-export([process_sm_iq/3]).

-include("ejabberd.hrl").
-include("logger.hrl").
-include("jlib.hrl").

-define(NS_HELPDESK, <<"jabber:helpdesk:live">>).

-callback init(binary(), gen_mod:opts()) -> any().

start(Host, Opts) ->
  ?INFO_MSG("mod_live start : opts - ~p", [Opts]),
  IQDisc = gen_mod:get_opt(iqdisc, Opts, fun gen_iq_handler:check_type/1, one_queue),
  Mod = gen_mod:db_mod(Host, Opts, ?MODULE),
  Mod:init(Host, Opts),
  gen_iq_handler:add_iq_handler(ejabberd_sm, Host, ?NS_HELPDESK, ?MODULE, process_sm_iq, IQDisc),
  ok.

stop(Host) ->
  ?INFO_MSG("shutting down mod_live ~p", [Host]),
  ok.

process_sm_iq(From, _, #iq{type='set', sub_el = #xmlel{name = <<"create">>, attrs = Attrs} = Sub_el} = IQ) ->
	IQ#iq{type = error, sub_el = [?ERR_BAD_REQUEST]};
process_sm_iq(_From, _To, IQ) ->
	IQ#iq{type = error, sub_el = [?ERR_FORBIDDEN]}.

depends(_Host, _Opts) ->
  [].

mod_opt_type(db_type) -> fun(T) -> ?INFO_MSG("dbtype ~p",[T]),ejabberd_config:v_db(?MODULE, T) end;
mod_opt_type(iqdisc) -> fun gen_iq_handler:check_type/1;
mod_opt_type(_) -> [db_type, iqdisc].
