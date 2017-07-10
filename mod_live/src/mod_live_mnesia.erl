-module(mod_live_mnesia).
-behaviour(mod_live).

%% API
-export([init/2,
	add_user/2]).

-include("logger.hrl").
-include("mod_live.hrl").

%%%===================================================================
%%% API
%%%===================================================================
init(_Host, _Opts) ->
	ejabberd_mnesia:create(?MODULE, lchat,
			   [{disc_copies, [node()]},
			    {attributes, record_info(fields, lchat)}]),
	ejabberd_mnesia:create(?MODULE, lparticipant,
			   [{disc_copies, [node()]},
			    {attributes, record_info(fields, lparticipant)}]),
	ejabberd_mnesia:create(?MODULE, lhistory,
			   [{disc_copies, [node()]},
			    {attributes, record_info(fields, lhistory)}]),
	ok.