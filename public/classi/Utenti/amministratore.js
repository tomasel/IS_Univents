var User=require("./user");
class Amministratore extends User.User{
    constructor(ID,nome,email,foto){
        this.ID=ID;
        this.nome=nome;
        this.email=email;
        this.foto=foto;
        this.tipo_utente="Amministratore";
    }

    inserisci_evento(){

    }

    rimuovi_evento(){

    }

    rimuovi_commento(){

    }

    rimuovi_utente(){

    }

    assegna_ruolo(){

    }
}

exports.Amministratore=Amministratore;