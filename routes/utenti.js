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


app.get('/',async (req, res) => {
  try{
    var uid= new mongoose.Types.ObjectId(req.headers.user_id);
    let utente = await Utente.findById(uid);
    console.log("uid2: "+uid);
    res.status(200).json(utente);
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 

});

/*PATCH add star event to user array*/
app.patch('/:id_evento',async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.headers.user_id);
  Event.exists({_id:req.params.id_evento}, function(err, succ){
    if (err){
      console.log(err)
    }else{
      if(succ == null){
        Univ.exists({_id:req.params.id_evento}, function(err, succ2){
          if (err){
            console.log(err)
          }else{
            if(succ2 == null){return res.status(404).send("event not exist")}
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
              res.status(200).send("event added");
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
          res.status(200).send("event added");
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
  const userId = mongoose.Types.ObjectId(req.headers.user_id);
  
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
      
  res.status(200).send("event deleted");
}catch (err) {
  return res.status(500).send({
    error: err || 'Something went wrong.'
  });
} 
});

module.exports = app;
