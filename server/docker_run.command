docker run -d \
    --name "ejabberd" \
    -p 5222:5222 \
    -p 5269:5269 \
    -p 5280:5280 \
    -h 'public.localhost' \
    -e "XMPP_DOMAIN=public.localhost" \
    -e "ERLANG_NODE=ejabberd" \
    -e "EJABBERD_ADMINS=admin@public.localhost" \
    -e "EJABBERD_USERS=admin@public.localhost:pass" \
    -e "TZ=Asia/Ulaanbaatar" \
    chatserver