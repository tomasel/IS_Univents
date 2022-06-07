const jwt = require('jsonwebtoken');
const fs = require("fs");

const tokenChecker = function(req, res, next) {
	
	// check header or url parameters or post parameters for token
	var token = fs.readFileSync("token.txt","utf8");

	console.log("token: "+token);

	if (token == undefined) {
		return res.status(401).render('login/noauth', {
			title: 'Not logged in!'
		});
	}

	// decode token, verifies secret and checks exp
	console.log("Super secret: "+process.env.SUPER_SECRET);
	jwt.verify(token, /*process.env.SUPER_SECRET*/"ciao", function(err, decoded) {			
		if (err) {
			return res.status(403).send({
				success: false,
				message: 'Failed to authenticate token.'
			});		
		} else {
			// if everything is good, save to request for use in other routes
			req.loggedUser = decoded;
			console.log("all good");
			next();
		}
	});
	
};

module.exports = tokenChecker
