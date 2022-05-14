const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://univents_database:password@univents.y54y3.mongodb.net/univents_database?retryWrites=true&w=majority');

const { Schema } = mongoose;
const student_schema = new Schema({
    name:  String,
    surname: String,
    date: { type: Date, default: Date.now },
    event_list : [{id_event: ObjectId}],
});


class User{
    constructor(ID,nome,email,foto/*,tipo_utente*/){
        this.ID=ID;
        this.nome=nome;
        this.email=email;
        this.foto=foto;
        // this.tipo_utente=tipo_utente;
    }

    login(){
    }

    logout(){
    }
}

exports.User=User;
exports.student_schema=student_schema;