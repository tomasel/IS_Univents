var commento = require("./commento.js")
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://univents_database:password@univents.y54y3.mongodb.net/univents_database?retryWrites=true&w=majority');

const { Schema } = mongoose;
const event_schema = new Schema({
    title:  String,
    info:   String,
    comments: [{ body: String, date: Date, id_creator: ObjectId, reported: Boolean }],
    date: { type : Date, default: Date.now },
    date_event: { day: Number, month: Number, year : Number, hour: Number, minutes: Number},
    place: { city: String, street : String, number: Number},
    hidden: Boolean,
    reported: Boolean,
    meta: {
      favs:  Number
    }
  });

class Evento{
    constructor(ID,nome,orario,luogo,info,creatore,tipo,commenti){
        this.ID=ID;
        this.nome=nome;
        this.orario=orario;
        this.luogo=luogo;
        this.info=info
        this.creatore=creatore;
        this.tipo=tipo;
        //this.commenti sarà una lista di commenti
        this.commenti=commenti;
        // this.preferito=false; ?? COME GESTIAMO I PREFERITI
    }

    check_word_spelling(){

    }

    check_word_correction(){

    }

    commenta(){

    }

    elimina_commento(ID_utente){

    }

    aggiungi_ai_preferiti(){

    }

    pubblica(){

    }

    cancella_evento(){

    }
}

exports.Evento=Evento;
exports.event_schema=event_schema;