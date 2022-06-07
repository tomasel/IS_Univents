/**
 * https://www.npmjs.com/package/supertest
 */
 const request = require('supertest');
 const app     = require('../app');
 
 //GET
 describe('GET /api/v1/utente', () => {
 
   // Moking utente.find method
   let utentepy;
   // Moking utente.findById method
   let utentepyFindById;
 
   beforeAll( () => {
     const utente = require('../public/models/utente');
     utentepy = jest.spyOn(utente, 'find').mockImplementation((criterias) => {
       return [{
         title: 'Software Engineering 2'
       }];
     });
     utentepyFindById = jest.spyOn(utente, 'findById').mockImplementation((id) => {
       if (id==1010)
         return {
           title: 'Software Engineering 2'
         };
       else
         return {};
     });
   });
 
   afterAll(async () => {
     utentepy.mockRestore();
     utentepyFindById.mockRestore();
   });
   
   test('GET /api/v1/utente should respond with data of utente', async () => {
     return request(app)
       .get('/api/v1/utente')
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
 
 });


 //POST
 describe('POST /api/v1/utente', () => {
 
  // Moking utente.find method
  let utentepy;
  // Moking utente.findById method
  let utentepyFindById;

  beforeAll( () => {
    const utente = require('../public/models/utente');
    utentepy = jest.spyOn(utente, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    utentepyFindById = jest.spyOn(utente, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    utentepy.mockRestore();
    utentepyFindById.mockRestore();
  });


  test('POST /api/v1/utente should respond 200 and utente creato', async () => {
    return request(app)
      .post('/api/v1/utente')
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

 //PATCH
 describe('PATCH /api/v1/utente', () => {
 
  // Moking utente.find method
  let utentepy;
  // Moking utente.findById method
  let utentepyFindById;

  beforeAll( () => {
    const utente = require('../public/models/utente');
    utentepy = jest.spyOn(utente, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    utentepyFindById = jest.spyOn(utente, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    utentepy.mockRestore();
    utentepyFindById.mockRestore();
  });

  test('PATCH /api/v1/utente/ should respond 200 and event added', async () => {
    return request(app)
      .post('/api/v1/utente')
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
describe('DELETE /api/v1/utente', () => {
 
    // Moking utente.find method
    let utentepy;
    // Moking utente.findById method
    let utentepyFindById;
  
    beforeAll( () => {
      const utente = require('../public/models/utente');
      utentepy = jest.spyOn(utente, 'find').mockImplementation((criterias) => {
        return [{
          title: 'Software Engineering 2'
        }];
      });
      utentepyFindById = jest.spyOn(utente, 'findById').mockImplementation((id) => {
        if (id==1010)
          return {
            title: 'Software Engineering 2'
          };
        else
          return {};
      });
    });
  
    afterAll(async () => {
      utentepy.mockRestore();
      utentepyFindById.mockRestore();
    });
  
  
    test('DELETE /api/v1/utente should respond 200 and event deleted', async () => {
      return request(app)
        .post('/api/v1/utente')
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
