const express = require('express');
const Utente = require('../public/models/utente');
const jwt = require('jsonwebtoken');
const app = express();

app.post ('', async function(req, res) {
    console.log("looking for user");
    let user = await Utente.findOne({
        email: req.body.email
    });
    console.log("found user "+user);

    if (user == null) {
        console.log("user is null");
        return res.status(500).json({ success: false, message: 'Authentication failed. User not found.' });
    }

    console.log(user.password+req.body.password);
    if (user.password != req.body.password) {
        console.log("no pass");
        return res.status(500).json({ success: false, message: 'Authentication failed. Wrong password.' });
    }

    // crea token
	var payload = {
		email: user.email,
		id: user._id
	}
	var options = {
		expiresIn: 86400 
	}
	var token = jwt.sign(payload, "a726f6a47a7757160e105748c720435fc508311528585f5601f2d8dbaae60ade", options);

    res.json({
            success: true,
            message: 'Authentication successfull.',
            email: user.email,
            id: user._id,
            token: token,
            self: "/home" + user._id + "&" + token
        });
        
        //console.log(user + token + payload);
});

module.exports = app;