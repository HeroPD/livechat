-record(lchat, {
  ts = {<<"">>, <<"">>} :: {binary(), binary()},
  info = <<"{}">> :: binary(),
  timestamp = 0 :: non_neg_integer()
  }).
-record(lchatinfo, {
  ts = {<<"">>, <<"">>} :: {binary(), binary()},
  name = <<"">> :: binary(),
  value = <<"">> :: binary()
}).
-record(lparticipant, {
  jts = {<<"">>, <<"">>, <<"">>} :: {binary(), binary(), binary()},
  type = visitor :: visitor | user,
  status = online :: online | offline | left,
  timestamp = 0 :: non_neg_integer()
  }).
-record(lhistory, {
  jts = {<<"">>, <<"">>, <<"">>} :: {binary(), binary(), binary()},
  payload = <<"">> :: binary(),
  timestamp = 0 :: non_neg_integer()
  }).