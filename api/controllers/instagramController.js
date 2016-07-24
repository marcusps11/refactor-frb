var request = require('request');
var Instagram = require('instagram-node').instagram();

Instagram.use({ access_token: '8a8dcfb52d084143833a43072b11efff' });

Instagram.use({ client_id: '7056aa7f2ef24f1286c943359d0a3c98',
         			client_secret: 'c571c6e1a6274323bbf9d90613f03f7c' });

var baseURL = 'https://api.instagram.com/oauth/authorize';
var redirect_uri = 'http://localhost:3000/api/instagram/callback';

function authorize_user(req, res) {
	console.log('g')
	res.redirect(Instagram.get_authorization_url(redirect_uri));
}

function handleauth(req, res) {
	console.log('hello');
	Instagram.authorize_user(req.query.code, redirect_uri, function(err, result) {
		if(err) {
		} else {
			console.log(result)
			res.send();
		}
	});
} 



function getInstagram(req, res) {
Instagram.user('3461258', function(err, result, remaining, limit) {
	console.log(result)
});
}



module.exports = {
	authorize_user:  authorize_user,
	handleauth: handleauth,
	getInstagram:getInstagram
};