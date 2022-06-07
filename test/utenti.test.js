/**
 * https://www.npmjs.com/package/supertest
 */
 const request = require('supertest');
 const app     = require('../app');
 
 //GET
 describe('GET /api/v1/utente', () => {
 
   // Moking utente.find method
   let utenteSpy;
   // Moking utente.findById method
   let utenteSpyFindById;
 
   beforeAll( () => {
     const utente = require('../public/models/utente');
     utenteSpyFindById = jest.spyOn(utente, 'findById').mockImplementation((id) => {
       if (id==1010)
         return {
           title: 'Software Engineering 2'
         };
       else
         return {};
     });
   });
 
   afterAll(async () => {
     utenteSpyFindById.mockRestore();
   });
   
   test('GET /api/v1/utente should respond with data of utente', async () => {
     return request(app)
       .get('/api/v1/utente')
       .expect('Content-Type', /json/)
       .expect(200)
   });   
 
 });


 //PATCH
 describe('PATCH /api/v1/utente', () => {
 
  // Moking utente.find method
  let utenteSpy;
  // Moking utente.findById method
  let utenteSpyFindById;

  beforeAll( () => {
    const utente = require('../public/models/utente');
    utenteSpy = jest.spyOn(utente, 'findOneAndUpdate').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });

  });

  afterAll(async () => {
    utenteSpy.mockRestore();
  });

  test('PATCH /api/v1/utente/ should respond 200 and event added', async () => {
    return request(app)
      .patch('/api/v1/utente/629deddb8e09118647119161')
      .expect('event added')
      .expect(200)
  });

});

//DELETE
describe('DELETE /api/v1/utente', () => {
 
    // Moking utente.find method
    let utenteSpy;
    // Moking utente.findById method
    let utenteSpyFindById;
  
    beforeAll( () => {
      const utente = require('../public/models/utente');
      utenteSpy = jest.spyOn(utente, 'findOneAndUpdate').mockImplementation((criterias) => {
        return [{
          title: 'Software Engineering 2'
        }];
      });
    });
    afterAll(async () => {
      utenteSpy.mockRestore();
    });
  
  
    test('DELETE /api/v1/utente should respond 200 and event deleted', async () => {
      return request(app)
        .delete('/api/v1/utente/629deddb8e09118647119161')
        .expect('event deleted')
        .expect(200)
    });
  
  });
