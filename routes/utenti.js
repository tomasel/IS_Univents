var express = require('express');
const { default: mongoose } = require('mongoose');
const Utente = require('../public/models/utente');
const Event = require('../public/models/evento');
const Univ = require('../public/models/university');
const app = express();


/*POST crea utente*/
app.post('/',async (req, res) => {
  const newUtente = new Utente(req.body);

  try{
    await newUtente.save();
    res.send("utente creato");
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 

});

//GET informazioni utente
app.get('/',async (req, res) => {
  var uid=req.headers.user_id;
  // var userId = new mongoose.Types.ObjectId();
  // userId=JSON.stringify(uid);
  try{
  // console.log(userId);
  let utente = await Utente.findById(uid);
  console.log(utente);
  res.status(200).json(utente);
}catch (err) {
  return res.status(500).send({
    error: err || 'Something went wrong.'
  });
} 

});

/*PATCH add star event to user array*/
app.patch('/:id_evento',async (req, res) => {
  const userId = mongoose.Types.ObjectId("6289f47e6fdc1cd83ca2b39a");
  Event.exists({_id:req.params.id_evento}, function(err, succ){
    if (err){
      console.log(err)
    }else{
      if(succ == null){
        Univ.exists({_id:req.params.id_evento}, function(err, succ2){
          if (err){
            console.log(err)
          }else{
            if(succ2 == null){return res.status(404).json("event not exist")}
            console.log("event exist");
            //add evento
            try{
              Utente.findOneAndUpdate(
                    { _id: userId }, 
                    { $push: { star_event_list:  {_id:req.params.id_evento  }  } },
                   function (error, success) {
                         if (error) {
                             console.log(error);
                         } else {
                             //console.log(success);
                         }
                     });
              res.status(200).json("event added");
            }catch (err) {
              return res.status(500).send({
                error: err || 'Something went wrong.'
              });
            }
          }});
      } else {
        try{
          Utente.findOneAndUpdate(
                { _id: userId }, 
                { $push: { star_event_list:  {_id:req.params.id_evento  }  } },
               function (error, success) {
                     if (error) {
                         console.log(error);
                     } else {
                         //console.log(success);
                     }
                 });
          res.status(200).json("event added");
        }catch (err) {
          return res.status(500).send({
            error: err || 'Something went wrong.'
          });
        }
      }
    }
  });
});
 

/*DELETE  star event in user array*/
app.delete('/:id_evento',async (req, res) => {
  const userId = mongoose.Types.ObjectId("6289f47e6fdc1cd83ca2b39a");
  
try{
      Utente.findOneAndUpdate(
        { _id: userId }, 
        { $pull: { star_event_list:  {_id:req.params.id_evento  } }},
        function (error, success) {
          if (error) {
              console.log(error);
          } else {
              //console.log(success);
          }
      });
      
  res.status(200).json("event deleted");
}catch (err) {
  return res.status(500).send({
    error: err || 'Something went wrong.'
  });
} 
});

module.exports = app;
