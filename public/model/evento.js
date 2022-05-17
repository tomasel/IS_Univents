const mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model
module.exports = mongoose.model('Evento', new Schema({ 
	title:  String,
    info:   String,
    comments: [{ body: String, date: Date, id_creator: ObjectId, reported: Boolean }],
    date: { type : Date, default: Date.now },
    date_event: { day: Number, month: Number, year : Number, hour: Number, minutes: Number},
    place: { city: String, street : String, number: Number},
    hidden: Boolean,
    reported: Boolean,
    meta: {
      favs:  Number
    }  
}));


//const Event = mongoose.model('Event', eventSchema);
//const evento1 = new Event({ title: 'piscina' , info : 'costume', place:{city: 'Trento', street:'Via sommarive 5', number: '5'}, date_event: { day: '13', month: '5', year : '2022', hour: '16', minutes: '30'} });
//evento1.save().then(() => console.log('meow'));