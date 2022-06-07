const mongoose = require('mongoose');

// set up a mongoose model
const EventSchema = new mongoose.Schema({ 
	  title:  {type:String},
    info:   {type:String},
    id_creator: {type:String},
    comments: [{ body: String, date: Date, id_creator: String, reported: Boolean }],
    date: { type : Date, default: Date.now },
    date_event: { type : Date},
    place: {type:String},
    hidden: Boolean,
    reported: Boolean,
    meta: {
      favs:  Number
    }  
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
