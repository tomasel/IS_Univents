const mongoose = require('mongoose');

// set up a mongoose model
const EventSchema = new mongoose.Schema({ 
	  title:  String,
    info:   String,
    id_creator: String,
    comments: [{ body: String, date: Date, id_creator: String, reported: Boolean }],
    date: { type : Date, default: Date.now },
    date_event: { day: Number, month: Number, year : Number, hour: Number, minutes: Number},
    place: { city: String, street : String, number: Number},
    hidden: Boolean,
    reported: Boolean,
    meta: {
      favs:  Number
    }  
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;