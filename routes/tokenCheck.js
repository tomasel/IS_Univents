const jwt = require('jsonwebtoken');

const tokenChecker = function(req, res, next) {
	
	// check header or url parameters or post parameters for token
	var token = req.body.token ;

	if (token == undefined) {
		return res.status(401).render('login/noauth', {
			title: 'Not logged in!'
		});
	}

	// decode token, verifies secret and checks exp
	jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {			
		if (err) {
			return res.status(403).send({
				success: false,
				message: 'Failed to authenticate token.'
			});		
		} else {
			// if everything is good, save to request for use in other routes
			req.loggedUser = decoded;
			next();
		}
	});
	
};

module.exports = tokenChecker
