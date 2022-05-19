const mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Utente', new Schema({
    name:  String,
    surname: String,
    email: String,
    password: String,
    star_event_list : [{id_event: ObjectId}],
    roles : String
}));
   
