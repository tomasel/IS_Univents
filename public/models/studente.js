const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//import mongoose from 'mongoose';

module.exports = mongoose.model('Utente', new Schema({
    name:  String,
    surname: String,
    mail: String,
    password: String,
    star_event_list : [{id_event: ObjectId}],
    roles : String
}));
   
//const Student = mongoose.model('Student', studentSchema);
//const student1 = new Student({ name: 'Sara' , surname : 'Rossi'});
//student1.save().then(() => console.log('meow'));