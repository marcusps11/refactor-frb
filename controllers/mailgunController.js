
var api_key = 'key-a0c98143c2e3a66fe879e37b225f14e4';
var domain = 'mg.forestroad.co.uk';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


function sendMessage(req, res) {
	console.log(req.body);
	var msg = {
		to:       'marcusps1@gmail.com',
		from:     'Excited User <me@samples.mailgun.org>',
		subject:  'Hello World',
		text:     req.body.msg
	};

	mailgun.messages().send(msg, function (error, data) {
		console.log(arguments, '<<<');

		if (error) {
			console.log(error);
			res.json(error);
		} else {
			res.json({
				data: data,
				status: 'success'
			});
		}
	});
}


module.exports = {
	sendMessage: sendMessage
};