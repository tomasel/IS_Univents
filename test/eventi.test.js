/**
 * https://www.npmjs.com/package/supertest
 */
 const request = require('supertest');
 const app     = require('../app');
 
 //GET
 describe('GET /api/v1/eventi', () => {
 
   // Moking evento.find method
   let eventiSpy;
   // Moking evento.findById method
   let eventiSpyFindById;
 
   beforeAll( () => {
     const evento = require('../public/models/evento');
     eventiSpy = jest.spyOn(evento, 'find').mockImplementation((criterias) => {
       return [{
         title: 'Software Engineering 2'
       }];
     });
     eventiSpyFindById = jest.spyOn(evento, 'findById').mockImplementation((id) => {
       if (id==1010)
         return {
           title: 'Software Engineering 2'
         };
       else
         return {};
     });
   });
 
   afterAll(async () => {
     eventiSpy.mockRestore();
     eventiSpyFindById.mockRestore();
   });
   
   test('GET /api/v1/eventi should respond with an array of eventi', async () => {
     return request(app)
       .get('/api/v1/eventi')
       .expect('Content-Type', /json/)
       .expect(200)
   });
 
   
   test('GET /api/v1/eventi/:id should respond with json, event data', async () => {
     return request(app)
       .get('/api/v1/eventi/629e00da33ae678d12d5f3b4')
       .expect('Content-Type', /json/)
       .expect(200);
   });

   
 
 });


 //POST
 describe('POST /api/v1/eventi', () => {
 
  // Moking evento.find method
  let eventiSpy;
  // Moking evento.findById method
  let eventiSpyFindById;

  beforeAll( () => {
    const evento = require('../public/models/evento');
    eventiSpy = jest.spyOn(evento, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    eventiSpyFindById = jest.spyOn(evento, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    eventiSpy.mockRestore();
    eventiSpyFindById.mockRestore();
  });


  test('POST /api/v1/eventi should respond 200 and evento creato', async () => {
    return request(app)
      .post('/api/v1/eventi')
      .expect('Content-Type', /json/)
      .expect(200)
      
  });

});

 //DELETE
 describe('DELETE /api/v1/eventi', () => {
 
  // Moking evento.find method
  let eventiSpy;
  // Moking evento.findById method
  let eventiSpyFindById;

  beforeAll( () => {
    const evento = require('../public/models/evento');
    eventiSpy = jest.spyOn(evento, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    eventiSpyFindById = jest.spyOn(evento, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    eventiSpy.mockRestore();
    eventiSpyFindById.mockRestore();
  });


  test('DELETE /api/v1/eventi should respond 200 and evento cancellato', async () => {
    return request(app)
      .delete('/api/v1/eventi/629e00da33ae678d12d5f3b4')
      .expect('Content-Type', /json/)
      .expect(200)
      });

});

 //PUT
 describe('PUT /api/v1/eventi', () => {
 
  // Moking evento.find method
  let eventiSpy;
  // Moking evento.findById method
  let eventiSpyFindById;

  beforeAll( () => {
    const evento = require('../public/models/evento');
    eventiSpy = jest.spyOn(evento, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    eventiSpyFindById = jest.spyOn(evento, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    eventiSpy.mockRestore();
    eventiSpyFindById.mockRestore();
  });


  test('PUT /api/v1/eventi/titolo should respond 200 and array of filtered title event', async () => {
    return request(app)
      .put('/api/v1/eventi/titolo/festona')
      .expect('Content-Type', /json/)
      .expect(200)
  });

  test('PUT /api/v1/eventi/data should respond 200 and array of filtered event date', async () => {
    return request(app)
      .put('/api/v1/eventi/data/2022-06-25')
      .expect('Content-Type', /json/)
      .expect(200)
  });

});
