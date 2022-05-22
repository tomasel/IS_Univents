const { type } = require("express/lib/response");
const app = require("../app");
const fs = require("fs");
const { throws } = require("assert");
const { exit } = require("process");


class Evento{ //TODO: OTTENERE ID CREATORE; DA DOVE?
  constructor(nome,data,orario,luogo,info,creatore,tipo){
    this.nome=nome;
    this.data=data;
    this.orario=orario;
    this.luogo=luogo;
    this.info=info
    this.creatore=creatore;
    this.tipo=tipo;
    //this.commenti sarà una lista di commenti
    // this.preferito=false; ?? COME GESTIAMO I PREFERITI
  }

}

//funzione di render
exports.list_event = function(req, res){
  res.status(200).render('comunita_studenti', {
    title: 'Eventi '
  });
};



// funzione create_event
exports.create_event = function(req, res){
  res.status(200).render('comunita_studenti/crea_evento', {
    title: 'Crea Evento '
  });
};


//funzione di controllo dei campi
check=function(req){
  var dt = new Date(req.body.data_ora).toJSON();
  var pulito=true;

  //controllo che i campi non siano vuoti
  if(req.body.nome_evento == null || req.body.nome_evento == null ||
      dt == null || req.body.descrizione_evento==null) return 1; //1: rifiutata per campi vuoti

    //lettura parole vietate
    var data = fs.readFileSync("views/comunita_studenti/parole_vietate.txt","utf8");
    var parole=data.split(/\r?\n/);

    //per ogni parola controllo che non sia contenuta in nessun campo
    parole.forEach(element=>{
      if( req.body.nome_evento.search(element,"/i")!=-1 ||
          req.body.luogo_evento.search(element,"/i")!=-1 ||
          req.body.descrizione_evento.search(element,"/i")!=-1
      ) pulito=false; //OTTIMIZZAZIONE: SI FERMA APPENA TROVA LA PRIMA PAROLA
    })
    console.log(pulito);
    if (!pulito) return 2; //2:rifiutata per parole illegali
    return 3; //3: accettata
     
}

//funzione che crea evento
exports.crea = function(req, res){
  var creatore = 1;//COME LO TROVO??

  //controllo sui campi
  var risultato=check(req);

  //1:evento rifiutato per campi lasciato vuoti
  if(risultato==1)
  {
    res.status(200).render('comunita_studenti/creazione_rifiutata_undefined', {
      title: 'Errore '
    });
  }

  //2: evento rifiutato per parole vietate
  else if(risultato==2)
  {
    res.status(200).render('comunita_studenti/creazione_rifiutata_vietato', {
      title: 'Errore '
    });
  }    
  //altrimenti:evento accettato
  else
  {
    var dt = new Date(req.body.data_ora).toJSON();
    console.log(req.body.nome_evento);
    console.log(req.body.luogo_evento);
    console.log(dt.slice(0,10));
    console.log(dt.slice(11,16));
    console.log(req.body.descrizione_evento);
    var ev = new Evento(req.body.nome_evento,
                        dt.slice(0,10),//data
                        dt.slice(11,16),//ora
                        req.body.luogo_evento,
                        req.body.descrizione_evento,
                        creatore,                    //TODO
                        "Evento interno");
    
    //send to API
    fetch("http://localhost:3000/api/v1/eventi",{
      method: "POST",
      headers:{
      },
      mod:"cors",
      body: JSON.stringify({
        title: title,
        place: place,
        date_event: date_event,
        info: info,
        id_creator: id_creator
      })
    })
    .then(res=>res.json())
    .catch(err=>console.log(err));
    
    res.status(200).render('comunita_studenti/creazione_accettata',{
      title: 'Successo '
    });
  }

};
