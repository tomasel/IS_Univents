var express = require('express');
const Event = require('../public/models/evento');
const app = express();


/* GET eventi listing. */
app.get('/', async (req, res) => {
  
  try{
    let event = await Event.find();
    event = event.map( (Event) => {
        return {
          _id: Event._id,
          title: Event.title
        };
    });
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 

});

/*GET evento by ID*/
app.get('/:id',async (req, res) => {
  
  try{
    let event = await Event.findById(req.params.id);
    res.status(200).json(event);
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 

});

/*POST crea evento*/
app.post('/',async (req, res) => {
  const newEvent = new Event(req.body);

  try{
    await newEvent.save();
    res.send(newEvent);
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 

});

/*DELETE un evento by id*/
app.delete('/:id',async (req, res) => {
  //f utente is == id_creator
  if(1);

  try{
    let event = await Event.findByIdAndDelete(req.params.id);
    res.status(200).json(event);
    console.log("deleted");
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }

});


module.exports = app;

