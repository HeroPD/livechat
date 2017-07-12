export const Config = { 
	connectionUrl: 'ws://public.localhost:5280/websocket/',
	domain: 'public.localhost',
	fieldConfig: [
		{
			label: 'Nickname',
			key: 'name',
			required: true,
			type: 'text'
		},
		{
			label: 'Email',
			key: 'email',
			required: true,
			type: 'text',
			validate: function(validateText) {
				var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  			return re.test(validateText);
			}
		},
		{
			label: 'Gender',
			key: 'gender',
			required: true,
			type: 'list',
			options: ['Male', 'Female']
		},
		{
			label: 'How can we help you?',
			key: 'problem',
			required: true,
			type: 'text'
		},
	]
};