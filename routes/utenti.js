var express = require('express');
const Utente = require('../public/models/utente');
const app = express();


/*GET utente by ID*/
app.get('/',async (req, res) => {
    const userId = req.query.userId;
    const userPsw = req.query.userPsw
  
  try{
    let utente = await Utente.findByIdOne(UserId);
    if(!utente.password == userPsw){return "password errata"}
    res.status(200).json(event);
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 

});

module.exports = app;