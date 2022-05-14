var User=require("./user");
class Studente extends User.User{
    constructor(ID,nome,email,foto){
        this.ID=ID;
        this.nome=nome;
        this.email=email;
        this.foto=foto;
        this.tipo_utente="Studente";
    }

    inserisci_evento(){

    }

    rimuovi_evento(creatore){

    }

    aggiungi_preferito(){

    }
}

exports.Studente=Studente;