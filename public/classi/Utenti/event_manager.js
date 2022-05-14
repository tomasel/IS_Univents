var User=require("./user");
class Event_manager extends User.User{
    constructor(ID,nome,email,foto){
        this.ID=ID;
        this.nome=nome;
        this.email=email;
        this.foto=foto;
        this.tipo_utente="Event manager";
    }

    inserisci_evento(){

    }

    rimuovi_evento(){

    }

    rimuovi_commento(){

    }

}

exports.Event_manager=Event_manager;