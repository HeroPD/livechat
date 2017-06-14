-record(lchat, {
  ts = {<<"">>, <<"">>} :: {binary(), binary()},
  name = <<"">> :: binary(),
  info = <<"">> :: binary(),
  email = <<"">> :: binary(),
  timestamp = 0 :: non_neg_integer()
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