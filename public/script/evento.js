const evento = require('../models/evento');

module.exports = {
      /**
    * 
    * @param options.id ID of the evento 
  
    */
       getEvento: async (options) => {
  
        // Implement your business logic here...
        //
        // Return all 2xx and 4xx as follows:
        //
        // return {
        //   status: 'statusCode',
        //   data: 'response'
        // }
    
        // If an error happens during your business logic implementation,
        // you can throw it as follows:
        //
        // throw new Error('<Error message>'); // this will result in a 500
        var evento = await evento.findById(id).exec();
        

        var data = {
            "commenti": "<array>",
            "data": "<integer>",
            "data_aggiunta": "<integer>",
            "id": "<string>",
            "info": "<string>",
            "luogo": "<string>",
            "segnalato": "<integer>",
            "stars": "<integer>",
            "titolo": "<string>",
          },
        status = '200';
        data.commenti = evento.commenti;
        data.data = evento.data;
        data.data_aggiunta = evento.data_aggiunta;
        data.id = evento.id;
        data.info = evento.info;
        data.luogo = evento.luogo;
        data.segnalato = evento.segnalato;
        data.stars = evento.stars;
        data.titolo = evento.titolo;
        
        return {
          status: status,
          data: data
        };  
      },
    
    /**
    * 
    * @param options.id ID of the evento 
  
    */
    listEvento: async (options) => {
  
      // Implement your business logic here...
      //
      // Return all 2xx and 4xx as follows:
      //
      // return {
      //   status: 'statusCode',
      //   data: 'response'
      // }
  
      // If an error happens during your business logic implementation,
      // you can throw it as follows:
      //
      // throw new Error('<Error message>'); // this will result in a 500
      var listaEvento = await evento.find().exec();
      var data = {
          "commenti": "<array>",
          "data": "<integer>",
          "data_aggiunta": "<integer>",
          "id": "<string>",
          "info": "<string>",
          "luogo": "<string>",
          "segnalato": "<integer>",
          "stars": "<integer>",
          "titolo": "<string>",
        },
      status = '200';
      
      
      return {
        status: status,
        data: data
      };  
    },
  
    /**
    * 
    * @param options.id ID of the evento 
  
    */
    creaEvento: async (options) => {
  
      // Implement your business logic here...
      //
      // Return all 2xx and 4xx as follows:
      //
      // return {
      //   status: 'statusCode',
      //   data: 'response'
      // }
  
      // If an error happens during your business logic implementation,
      // you can throw it as follows:
      //
      // throw new Error('<Error message>'); // this will result in a 500
  
      var data = {
          "commenti": "<array>",
          "data": "<integer>",
          "data_aggiunta": "<integer>",
          "id": "<string>",
          "info": "<string>",
          "luogo": "<string>",
          "segnalato": "<integer>",
          "stars": "<integer>",
          "titolo": "<string>",
        },
      status = '200';
      evento.commenti = null;
      evento.data = data.data;
      evento.data_aggiunta = null;
      evento.id = null;
      evento.info = data.info;
      evento.luogo = data.luogo;
      evento.segnalato = 0;
      evento.stars = 0;
      evento.titolo = data.titolo;
      evento.save();//.then(() => console.log('meow'));
      return {
        status: status
        //data: data
      };  
    },
  };
  