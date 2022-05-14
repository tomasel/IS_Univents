var User=require("./user");
class Moderatore extends User.User{
    constructor(ID,nome,email,foto){
        this.ID=ID;
        this.nome=nome;
        this.email=email;
        this.foto=foto;
        this.tipo_utente="Moderatore";
    }

    inserisci_evento(){

    }

    rimuovi_evento(){

    }

    aggiungi_preferito(){

    }

    rimuovi_commento(){

    }
}

exports.Moderatore=Moderatore;