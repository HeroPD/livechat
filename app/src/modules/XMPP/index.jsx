import { Strophe, $iq } from "strophe.js";
import { Config } from '../../config.jsx';

class XMPP {

  constructor(connectionUrl) {
    this.connection = new Strophe.Connection(connectionUrl);
    Strophe.addNamespace('ModLive','jabber:live:chat');
  }

  connect(username, password, connectionListener) {
    this.connection.connect(username, password, connectionListener);
  }

  connectAnonymous(domain, connectionListener) {
    this.connection.connect(domain, null, connectionListener);
  }

  createChat(data, callback, errback) {
    var lscunit;
    lscunit = $iq({
      from: this.connection.jid,
      to: Config.domain,
      type: 'set'});
    var createChatUnit = lscunit.c('create',{
        xmlns: Strophe.NS.ModLive
    });
    data.forEach(item => {
      createChatUnit.c('data',{
        key: item.key,
        value: item.value
      }).up();
    });
    console.log(lscunit.tree());
    this.connection.sendIQ(lscunit, function(success) {
      var token = success.getElementsByTagName('create')[0].getAttribute('token');
      callback(token);
    }, function(err) {
      errback(err);
    });
  }

  joinChat(token, callback, errback) {
    console.log('joinChat');
  }
}

export default XMPP;