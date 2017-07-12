import { Strophe } from "strophe.js";

class XMPP {

	constructor(connectionUrl) {
		this.connection = new Strophe.Connection(connectionUrl);
	}

	connect(username, password, connectionListener) {
    this.connection.connect(username, password, connectionListener);
	}

	connectAnonymous(domain, connectionListener) {
		this.connection.connect(domain, null, connectionListener);
	}

	createChat(data, callback, errback) {

	}

}

export default XMPP;