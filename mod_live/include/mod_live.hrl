-record(lchat, {
  ts = {<<"">>, <<"">>} :: {binary(), binary()},
  timestamp = 0 :: non_neg_integer()
  }).
-record(lchatinfo, {
  tsk = {<<"">>, <<"">>, <<"">>} :: {binary(), binary(), binary()},
  value = <<"">> :: binary()
}).
-record(lparticipant, {
  uts = {<<"">>, <<"">>, <<"">>} :: {binary(), binary(), binary()},
  type = visitor :: visitor | user,
  status = online :: online | offline | left,
  timestamp = 0 :: non_neg_integer()
  }).
-record(lhistory, {
  uts = {<<"">>, <<"">>, <<"">>} :: {binary(), binary(), binary()},
  payload = <<"">> :: binary(),
  timestamp = 0 :: non_neg_integer()
  }).