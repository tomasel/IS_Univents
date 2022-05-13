import mongoose from 'mongoose';

//const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://univents_database:univents_password@univents.y54y3.mongodb.net/univents_database?retryWrites=true&w=majority');

const { Schema } = mongoose;
const studentSchema = new Schema({
    nome:  String,
    surname: String,
    id:   Number,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
   
const Student = mongoose.model('Student', { name: String });
const prova = new Studente({ name: 'Mario' , surname : 'Rossi' });
prova.save().then(() => console.log('meow'));