const express = require('express');
const Utente = require('../public/models/utente');
const jwt = require('jsonwebtoken');
const app = express();
// const readblob=require("read-blob");
const fs = require("fs");

app.post ('', async function(req, res) {
    console.log("looking for user");
    let user = await Utente.findOne({
        email: req.body.email
    },'name email password roles');

    if (user == null) {
        console.log("user is null");
        return res.status(500).json({ success: false, message: 'Authentication failed. User not found.' });
    }

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
    // SUPER_SECRET
	var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

    fs.writeFileSync("token.txt",token,"utf8");

    console.log("authentication produced token: "+token);

    
    res.json({
            success: true,
            message: 'Authentication successfull.',
            email: user.email,
            id: user._id,
            token: token,
            self: '/home/' + user._id
        });
        
    console.log("end of auth");
    // return res;
});

module.exports = app;
