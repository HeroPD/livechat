FROM rroemhild/ejabberd

ENV XMPP_DOMAIN=localhost \
		EJABBERD_STARTTLS=false \
		EJABBERD_AUTH_METHOD=anonymous \
		EJABBERD_SKIP_MODULES_UPDATE=true \
		EJABBERD_MOD_ADMIN_EXTRA=true \
		EJABBERD_SOURCE_MODULES=mod_live
COPY ./conf/ejabberd.yml.tpl /opt/ejabberd/conf/ejabberd.yml.tpl
ADD ./modules $EJABBERD_HOME/module_source
# ADD ./docker $EJABBERD_HOME
# RUN sh build_spec.sh