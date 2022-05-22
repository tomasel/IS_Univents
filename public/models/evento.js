const mongoose = require('mongoose');

// set up a mongoose model
const EventSchema = new mongoose.Schema({ 
	  title:  {type:String, required: true},
    info:   {type:String, required: true},
    id_creator: {type:String, required: true},
    comments: [{ body: String, date: Date, id_creator: String, reported: Boolean }],
    date: { type : Date, default: Date.now },
    date_event: { type : Date, required: true},
    place: {type:String, required: true},
    hidden: Boolean,
    reported: Boolean,
    meta: {
      favs:  Number
    }  
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
