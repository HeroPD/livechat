-record(lchat, {
  ts = {<<"">>, <<"">>} :: {binary(), binary()},
  luserinfo = [] :: list(),
  lhistory = [] :: list(),
  timestamp = 0 :: non_neg_integer()
}).

-record(lchatinfo, {
  key = <<"">> :: binary(),
  value = <<"">> :: binary()
}).

-record(lconnection, {
  uts = {<<"">>, <<"">>, <<"">>} :: {binary(), binary(), binary()},
  timestamp = 0 :: non_neg_integer()
}).

-record(luser, {
  uts = {<<"">>, <<"">>, <<"">>} :: {binary(), binary(), binary()},
  timestamp = 0 :: non_neg_integer()
  }).

-record(lhistory, {
  us = {<<"">>, <<"">>} :: {binary(), binary()},
  payload = <<"">> :: binary(),
  timestamp = 0 :: non_neg_integer()
}).