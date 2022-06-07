/**
 * https://www.npmjs.com/package/supertest
 */
 const request = require('supertest');
 const app     = require('../app');
 
 //GET
 describe('GET /api/v1/eventi', () => {
 
   // Moking evento.find method
   let eventipy;
   // Moking evento.findById method
   let eventipyFindById;
 
   beforeAll( () => {
     const evento = require('../public/models/evento');
     eventipy = jest.spyOn(evento, 'find').mockImplementation((criterias) => {
       return [{
         title: 'Software Engineering 2'
       }];
     });
     eventipyFindById = jest.spyOn(evento, 'findById').mockImplementation((id) => {
       if (id==1010)
         return {
           title: 'Software Engineering 2'
         };
       else
         return {};
     });
   });
 
   afterAll(async () => {
     eventipy.mockRestore();
     eventipyFindById.mockRestore();
   });
   
   test('GET /api/v1/eventi should respond with an array of eventi', async () => {
     return request(app)
       .get('/api/v1/eventi')
       .expect('Content-Type', /json/)
       .expect(200)
       .then( (res) => {
         if(res.body && res.body[0]) {
           expect(res.body[0]).toEqual({
             title: 'Software Engineering 2'
           });
         }
       });
   });
 
   
   test('GET /api/v1/eventi/:id should respond with json, event data', async () => {
     return request(app)
       .get('/api/v1/eventi/1010')
       .expect('Content-Type', /json/)
       .expect(200, {
           title: 'Software Engineering 2'
         });
   });

   
 
 });


 //POST
 describe('POST /api/v1/eventi', () => {
 
  // Moking evento.find method
  let eventipy;
  // Moking evento.findById method
  let eventipyFindById;

  beforeAll( () => {
    const evento = require('../public/models/evento');
    eventipy = jest.spyOn(evento, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    eventipyFindById = jest.spyOn(evento, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    eventipy.mockRestore();
    eventipyFindById.mockRestore();
  });


  test('POST /api/v1/eventi should respond 200 and evento creato', async () => {
    return request(app)
      .post('/api/v1/eventi')
      .expect('Content-Type', /json/)
      .expect(200)
      .then( (res) => {
        if(req.body && req.body[0]) {
          expect(req.body[0]).toEqual({
            title: 'Software Engineering 2'
          });
        }
      });
  });

});

 //DELETE
 describe('DELETE /api/v1/eventi', () => {
 
  // Moking evento.find method
  let eventipy;
  // Moking evento.findById method
  let eventipyFindById;

  beforeAll( () => {
    const evento = require('../public/models/evento');
    eventipy = jest.spyOn(evento, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    eventipyFindById = jest.spyOn(evento, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    eventipy.mockRestore();
    eventipyFindById.mockRestore();
  });


  test('DELETE /api/v1/eventi should respond 200 and evento cancellato', async () => {
    return request(app)
      .post('/api/v1/eventi')
      .expect('Content-Type', /json/)
      .expect(200)
      .then( (res) => {
        if(req.body && req.body[0]) {
          expect(req.body[0]).toEqual({
            title: 'Software Engineering 2'
          });
        }
      });
  });

});

 //PUT
 describe('PUT /api/v1/eventi', () => {
 
  // Moking evento.find method
  let eventipy;
  // Moking evento.findById method
  let eventipyFindById;

  beforeAll( () => {
    const evento = require('../public/models/evento');
    eventipy = jest.spyOn(evento, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    eventipyFindById = jest.spyOn(evento, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    eventipy.mockRestore();
    eventipyFindById.mockRestore();
  });


  test('PUT /api/v1/eventi/titolo should respond 200 and array of filtered title event', async () => {
    return request(app)
      .post('/api/v1/eventi')
      .expect('Content-Type', /json/)
      .expect(200)
      .then( (res) => {
        if(req.body && req.body[0]) {
          expect(req.body[0]).toEqual({
            title: 'Software Engineering 2'
          });
        }
      });
  });

  test('PUT /api/v1/eventi/data should respond 200 and array of filtered event date', async () => {
    return request(app)
      .post('/api/v1/eventi')
      .expect('Content-Type', /json/)
      .expect(200)
      .then( (res) => {
        if(req.body && req.body[0]) {
          expect(req.body[0]).toEqual({
            title: 'Software Engineering 2'
          });
        }
      });
  });

});
