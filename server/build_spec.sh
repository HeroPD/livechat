# bash
erl -noinput +B -pa xmpp/ebin -pa xmpp/deps/*/ebin -eval \
	'case fxml_gen:compile("modules/mod_live/spec/mod_live_codec.spec", [{add_type_specs, xmpp_element}, {erl_dir, "modules/mod_live/src"}, {hrl_dir, "modules/mod_live/include"}]) of ok -> halt(0); _ -> halt(1) end.'