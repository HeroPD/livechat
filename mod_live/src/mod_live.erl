-module(mod_lsc).

-behaviour(gen_mod).

-export([start/2, 
  stop/1, 
  depends/2]).
-export([process/2]).

-include("ejabberd.hrl").
-include("logger.hrl").
-include("jlib.hrl").


-define(NS_HELPDESK, <<"jabber:helpdesk:live">>).

-callback init(binary(), gen_mod:opts()) -> any().

start(Host, Opts) ->
  ?INFO_MSG("Mod_live opts - ~p", [Opts]),
  Mod = gen_mod:db_mod(Host, Opts, ?MODULE),
  Mod:init(Host, Opts),
  ok.

stop(Host) ->
  ?INFO_MSG("Bye bye, pejabberd world!", []),
  ok.

depends(_Host, _Opts) ->
  [].

mod_opt_type(db_type) -> fun(T) -> ?INFO_MSG("dbtype ~p",[T]),ejabberd_config:v_db(?MODULE, T) end;
mod_opt_type(iqdisc) -> fun gen_iq_handler:check_type/1;
mod_opt_type(_) -> [db_type, iqdisc].
