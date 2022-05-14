//import mongoose from 'mongoose';

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://univents_database:password@univents.y54y3.mongodb.net/univents_database?retryWrites=true&w=majority');

const { Schema } = mongoose;
const studentSchema = new Schema({
    name:  String,
    surname: String,
    date: { type: Date, default: Date.now },
    event_list : [{id_event: ObjectId}],
  });
   
const Student = mongoose.model('Student', studentSchema);
const student1 = new Student({ name: 'Sara' , surname : 'Rossi'});
student1.save().then(() => console.log('meow'));