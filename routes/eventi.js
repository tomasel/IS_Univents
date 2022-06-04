var express = require('express');
const Event = require('../public/models/evento');
const app = express();


/* GET eventi listing. */
app.get('/', async (req, res) => {
  
  try{
    let event = await Event.find();

    res.status(200).json(event);
/*    event = event.map( (Event) => {
      //console.log(event);
        return {
          _id: Event._id,
          title: Event.title
        };
    });*/
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
  //console.log("body");
  //console.log(req.body);
  //console.log("newEvent");
  //console.log(newEvent);
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
  //if utente is == id_creator
  //const eventId = req.query.eventId
  const userId = req.query.userId
  let test = await Event.findById(req.params.id);
  if(!userId == test.id_creator ){
    return res.status(400).send("wrong user");
  };

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

/*PUT  event list with filter title*/  //  /api/v1/eventi/grigliata
app.put('/:filter_title', async (req, res) => {
  
  try{
    //let full_filter = "/"+req.params.filter+"/i";
    //console.log(full_filter);
    let event = await Event.find({ "title" : req.params.filter_title });
    //console.log(event);
    res.status(200).json(event);
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 

});

/*PUT  event list with filter data*/
app.put('/data/:filter_date', async (req, res) => {
  
  try{
    let startingDate = req.params.filter_date;
    let endDate = startingDate;
    endDate = endDate + 'T23:59:59';
    let event = await Event.find({ date_event : {$gte: startingDate, $lte: endDate} });
    console.log(event);
    res.status(200).json(event);
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 

});

module.exports = app;

