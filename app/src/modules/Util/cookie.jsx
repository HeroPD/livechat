export const Cookie = {
	setCookie : function(cname, cvalue, exdays) {
	  var d = new Date();
	  d.setTime(d.getTime() + (exdays*24*60*60*1000));
	  var expires = "expires="+ d.toUTCString();
	  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},
	getCookie : function(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i <ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) === ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) === 0) {
	      return c.substring(name.length, c.length);
	    }
	  }
	  return "";
	},
	set_cookies : function(jid, sid, rid) {
	    this.setCookie('xmpp_jid', jid, 30);
	    this.setCookie('xmpp_sid', sid, 30);
	    this.setCookie('xmpp_rid', rid, 30); 
	},
	del_cookies : function() {
	    this.setCookie('xmpp_jid', null, 0);
	    this.setCookie('xmpp_sid', null, 0);
	    this.setCookie('xmpp_rid', null, 0);   
	}
};