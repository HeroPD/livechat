-module(mod_live_mnesia).
-behaviour(mod_live).

%% API
-export([init/2,
	createchat/2]).

-include("logger.hrl").
-include("jlib.hrl").
-include("mod_live.hrl").

%%%===================================================================
%%% API
%%%===================================================================
init(_Host, _Opts) ->
	ejabberd_mnesia:create(?MODULE, lchat,
			   [{disc_copies, [node()]},
			    {attributes, record_info(fields, lchat)}]),
	ejabberd_mnesia:create(?MODULE, lchatinfo,
			   [{disc_copies, [node()]},
			    {attributes, record_info(fields, lchatinfo)}]),
	ejabberd_mnesia:create(?MODULE, lparticipant,
			   [{disc_copies, [node()]},
			    {attributes, record_info(fields, lparticipant)}]),
	ejabberd_mnesia:create(?MODULE, lhistory,
			   [{disc_copies, [node()]},
			    {attributes, record_info(fields, lhistory)}]),
	ok.

createchat(Data, From) ->
	Token = << << if N >= 10 -> N -10 + $a;true -> N + $0 end >> || <<N:4>> <= crypto:hash(sha, lists:flatten(io_lib:format("~p~p", [From#jid.luser ,p1_time_compat:system_time(seconds)]))) >>,
	?INFO_MSG("token ~p",[Token]),
	TS = {Token, From#jid.lserver},
	UTS = {From#jid.luser, Token, From#jid.lserver},
	F = fun () ->
			mnesia:write(#lchat{
				ts = TS,
				timestamp = p1_time_compat:system_time(seconds)
			}),
			mnesia:write(#lparticipant{
				uts = UTS,
				type = visitor,
				status = online,
				timestamp = p1_time_compat:system_time(seconds)
			})
	end,
	mnesia:transaction(F),
	addchatinfo(Data, Token, From#jid.lserver),
	Token.

addchatinfo([], _Token, _Server) ->
	ok;
addchatinfo([#xmlel{attrs = Attrs} = _H|T], Token, Server) ->
	Key = fxml:get_attr_s(<<"key">>,Attrs),
	TSK = {Token, Server, Key},
	Value = fxml:get_attr_s(<<"value">>,Attrs),
	F = fun () ->
			mnesia:write(#lchatinfo{
				tsk = TSK,
				value = Value
			})
	end,
	mnesia:transaction(F),
	addchatinfo(T, Token, Server).
