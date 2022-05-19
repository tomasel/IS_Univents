const express = require('express');
const router = express.Router();
const Utente = require('../models/utente');
const jwt = require('jsonwebtoken');

router.post('', async function(req, res) {
    let utente = await Utente.findOne({
        email: req.body.email
    }).exec();

    if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
    }

    if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    }

    res.json({
            success: true,
            message: 'Authentication successfull.',
            email: user.email,
            id: user._id,
            self: "api/v1/authentication" + user._id
        });
});

module.exports = router;
