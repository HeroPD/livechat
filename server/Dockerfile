FROM rroemhild/ejabberd

ENV XMPP_DOMAIN=localhost \
		EJABBERD_SKIP_MODULES_UPDATE=true \
		EJABBERD_MOD_ADMIN_EXTRA=true \
		EJABBERD_SOURCE_MODULES=mod_live

ADD ./modules $EJABBERD_HOME/module_source