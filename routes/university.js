var express = require('express');
const University = require('../public/models/university');
const app = express();


/* GET eventi listing. */
app.get('/', async (req, res) => {
  
  try{
    let univ = await University.find();
    console.log(univ);
    res.status(200).json(univ);
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
    let univ = await University.findById(req.params.id);
    res.status(200).json(univ);
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 
});

/*POST crea evento*/
app.post('/',async (req, res) => {
  const newUniv = new University(req.body);
  try{
    await newUniv.save();
    res.status(200).send("evento creato");
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 

});

/*DELETE un evento by id*/
// app.delete('/:id',async (req, res) => {
//   //if utente is == id_creator
//   //const eventId = req.query.eventId
//   const userId = req.query.userId
//   let test = await Event.findById(req.params.id);
//   if(!userId == test.id_creator ){
//     return res.status(400).send("wrong user");
//   };

//   try{
//     let event = await Event.findByIdAndDelete(req.params.id);
//     res.status(200).json("evento cancellato");
//   }catch (err) {
//     return res.status(500).send({
//       error: err || 'Something went wrong.'
//     });
//   }

// });

/*PUT  event list with filter building*/
app.put('/:filter_building', async (req, res) => {
  
    try{
      //let full_filter = "/"+req.params.filter+"/i";
      //console.log(full_filter);
      let univ = await University.find({ "building" : req.params.filter_building });
      //console.log(event);
      res.status(200).json(univ);
    }catch (err) {
      return res.status(500).send({
        error: err || 'Something went wrong.'
      });
    } 
  
  });

/*PUT  event list with filter title*/
app.put('/titolo/:filter_title', async (req, res) => {
  
  try{
    //let full_filter = "/"+req.params.filter+"/i";
    //console.log(full_filter);
    let univ = await University.find({ "title" : req.params.filter_title });
    //console.log(event);
    res.status(200).json(univ);
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
    let univ = await University.find({ date_event : {$gte: startingDate, $lte: endDate} });
    console.log(univ);
    res.status(200).json(univ);
  }catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  } 

});

module.exports = app;

