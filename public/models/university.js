const mongoose = require('mongoose');

// set up a mongoose model
const UnivSchema = new mongoose.Schema({ 
	title:  {type:String},
    info:   {type:String},
    building: {type:String},
    comments: [{ body: String, date: Date, id_creator: String, reported: Boolean }],
    date: { type : Date, default: Date.now },
    date_event: { type : Date},
    hidden: Boolean,
    meta: {
      favs:  Number
    }  
});

const University = mongoose.model('University', UnivSchema);
module.exports = University;
