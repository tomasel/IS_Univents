const mongoose = require('mongoose');

// set up a mongoose model
const UnivSchema = new mongoose.Schema({ 
	title:  {type:String, required: true},
    info:   {type:String, required: true},
    building: {type:String, required: true},
    comments: [{ body: String, date: Date, id_creator: String, reported: Boolean }],
    date: { type : Date, default: Date.now },
    date_event: { type : Date, required: true},
    hidden: Boolean,
    meta: {
      favs:  Number
    }  
});

const University = mongoose.model('University', UnivSchema);
module.exports = University;
