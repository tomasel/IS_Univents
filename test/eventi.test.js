/**
 * https://www.npmjs.com/package/supertest
 */
 const request = require('supertest');
 const app     = require('../app');
 
 describe('GET /api/v1/eventi', () => {
 
   // Moking evento.find method
   let eventipy;
   // Moking evento.findById method
   let eventipyFindById;
 
   beforeAll( () => {
     const evento = require('../public/models/evento');
     eventipy = jest.spyOn(evento, 'find').mockImplementation((criterias) => {
       return [{
         id: 1010,
         title: 'Software Engineering 2'
       }];
     });
     eventipyFindById = jest.spyOn(evento, 'findById').mockImplementation((id) => {
       if (id==1010)
         return {
           id: 1010,
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
             self: '/api/v1/eventi/1010',
             title: 'Software Engineering 2'
           });
         }
       });
   });
 
   
   test('GET /api/v1/eventi/:id should respond with json', async () => {
     return request(app)
       .get('/api/v1/eventi/1010')
       .expect('Content-Type', /json/)
       .expect(200, {
           self: '/api/v1/eventi/1010',
           title: 'Software Engineering 2'
         });
   });
 
 });