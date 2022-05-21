const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    name:  String,
    surname: String,
    email: String,
    password: String,
    star_event_list : [{id_event: String}],
    roles : String
});

const Utente = mongoose.model('User', UserSchema);
module.exports = Utente;   
