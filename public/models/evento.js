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
