var config = require('../config'); // get our config file
var express 	= require('express');
var app         = express();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

app.set('superSecret', config.secret); // secret variable

exports.Verificar = function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];


	// decode token
	if (token) {
		var userdata = jwt.decode(token);
		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				  console.log(Globalonline);


				req.decoded = decoded;

				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
}