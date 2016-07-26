
// key-a0c98143c2e3a66fe879e37b225f14e4 API SECRET
// pubkey-e60a71f7446890801c4c3543fbbd1c64 API PUBLIC

// ("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");

// var email = new sendgrid.Email();

function sendMessage(req, res) {
	var msg = {
	  to:       'marcusps1@gmail.com',
	  from:     req.body.email,
	  subject:  'Hello World',
	  text:     req.body.msg
	};

	sendgrid.send(msg, function(err, msg) {
	console.log(msg)
	  if (err) {
	    res.json(err);
	  } else {
	    res.json({
	      data: msg,
	      status: 'success'
	    });
	  }
	});
}

module.exports = {
	// sendMessage: sendMessage
};