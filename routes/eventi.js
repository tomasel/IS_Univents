var express = require('express');
const Event = require('../public/models/evento');
const app = express();
const { default: mongoose } = require('mongoose');


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
  try{
    await newEvent.save();
    res.status(200).send("evento creato");
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 

});

/*DELETE un evento by id*/
app.delete('/:id',async (req, res) => {

  // const userId = req.query.userId; DA RIMODIFICARE QUANDO AVREMO I VERI USER ID
  const userId=1;
  let test = await Event.findById(req.params.id);
  if(!userId == test.id_creator ){
    return res.status(400).send("wrong user");
  };

  try{
    let event = await Event.findByIdAndDelete(req.params.id);
    res.status(200).json("evento cancellato");
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }

});

/*PUT evento by Id_creatore*/
app.put('/my/:id_creatore',async (req, res) => {
  //const userId = mongoose.Types.ObjectId(req.params.id_creatore);
  try{
    let event = await Event.find({ "id_creator" : req.params.id_creatore});
    console.log(event);
    res.status(200).json(event);
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 
});

/*PUT  event list with filter title*/  //  /api/v1/eventi/titolo/grigliata
/*PUT  event list with filter title*/
app.put('/titolo/:filter_title', async (req, res) => {
  
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

