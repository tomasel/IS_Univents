const { type } = require("express/lib/response");
const app = require("../app");
const fs = require("fs");
const { throws } = require("assert");
const { exit } = require("process");
const { Script } = require("vm");
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


//funzione di render
exports.list_event = function(req, res){
  res.status(200).render('comunita_studenti', {
    title: 'Eventi '
  });
};

exports.get_event = function(req, res){
  res.status(200).render('comunita_studenti/visualizza_evento', {
    title: 'Evento specifico '
  });
};


// funzione create_event
exports.create_event = function(req, res){
  res.status(200).render('comunita_studenti/crea_evento', {
    title: 'Crea Evento '
  });
};

//commenti
exports.commenta = function(req, res){
  res.status(200).render('comunita_studenti/commenti', {
    title: 'Commenti'
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
      if(element!=""){
        if( req.body.nome_evento.search(element,"/i")!=-1 ||
            req.body.luogo_evento.search(element,"/i")!=-1 ||
            req.body.descrizione_evento.search(element,"/i")!=-1
        ) pulito=false; //OTTIMIZZAZIONE: SI FERMA APPENA TROVA LA PRIMA PAROLA
      }
    })
    // console.log(pulito);
    if (!pulito) return 2; //2:rifiutata per parole illegali
    return 3; //3: accettata
}


//funzione che crea evento
exports.crea = function(req, res){
  var creatore = "6289f47e6fdc1cd83ca2b39a";//COME LO TROVO??

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
    // console.log(req.body.nome_evento);
    // console.log(req.body.luogo_evento);
    // console.log(dt.slice(0,10));
    // console.log(dt.slice(11,16));
    // console.log(req.body.descrizione_evento);
  
    
    //send to API
    fetch("https://univents-trento.herokuapp.com/api/v2/eventi",{
      method: "POST",
      headers:{          
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        title: req.body.nome_evento,
        place: req.body.luogo_evento,
        date_event: dt.slice(0,16),
        info: req.body.descrizione_evento,
        id_creator: creatore, ///QUI DA CAMBIARE CREATORE
        hidden: 0,
        reported: 0,
        meta:{favs : '0'}
      })
    })
    .then(res=>res.json())
    .then(json => {
      console.log('parsed json', json) // access json.body here
    })
    .catch(err=>console.log(err));
    
    res.status(200).render('comunita_studenti/creazione_accettata',{
      title: 'Successo '
    });
  }

};


