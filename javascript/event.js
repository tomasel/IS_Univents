//import mongoose from 'mongoose';

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://univents_database:univents_password@univents.y54y3.mongodb.net/univents_database?retryWrites=true&w=majority');

const { Schema } = mongoose;
const eventSchema = new Schema({
    title:  String,
    info:   String,
    comments: [{ body: String, date: Date, id_creator: Number }],
    date: { type: Date, default: Date.now },
    place: { city: String, street : String, number: Number},
    hidden: Boolean,
    meta: {
      favs:  Number
    }
  });
   
const eventModel = mongoose.model('Event', eventSchema);
const evento1 = new eventModel({ title: 'barbeque' , info : 'portate della carne', place:{city: 'Trento', street:'Via sommarive 5', number: '5'}, date: {type:'12-05-2022'} });
evento1.save();//.then(() => console.log('meow'));