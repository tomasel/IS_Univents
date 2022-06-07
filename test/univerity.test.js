/**
 * https://www.npmjs.com/package/supertest
 */
 const request = require('supertest');
 const app     = require('../app');
 
 //GET
 describe('GET /api/v1/uni', () => {
 
   // Moking university.find method
   let unipy;
   // Moking university.findById method
   let unipyFindById;
 
   beforeAll( () => {
     const university = require('../public/models/univerity');
     unipy = jest.spyOn(university, 'find').mockImplementation((criterias) => {
       return [{
         title: 'Software Engineering 2'
       }];
     });
     unipyFindById = jest.spyOn(university, 'findById').mockImplementation((id) => {
       if (id==1010)
         return {
           title: 'Software Engineering 2'
         };
       else
         return {};
     });
   });
 
   afterAll(async () => {
     unipy.mockRestore();
     unipyFindById.mockRestore();
   });
   
   test('GET /api/v1/uni should respond with an array of uni', async () => {
     return request(app)
       .get('/api/v1/uni')
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
 
   
   test('GET /api/v1/uni/:id should respond with json, event data', async () => {
     return request(app)
       .get('/api/v1/uni/1010')
       .expect('Content-Type', /json/)
       .expect(200, {
           title: 'Software Engineering 2'
         });
   });

   
 
 });


 //POST
 describe('POST /api/v1/uni', () => {
 
  // Moking university.find method
  let unipy;
  // Moking university.findById method
  let unipyFindById;

  beforeAll( () => {
    const university = require('../public/models/university');
    unipy = jest.spyOn(university, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    unipyFindById = jest.spyOn(university, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    unipy.mockRestore();
    unipyFindById.mockRestore();
  });


  test('POST /api/v1/uni should respond 200 and university creato', async () => {
    return request(app)
      .post('/api/v1/uni')
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
 describe('PUT /api/v1/uni', () => {
 
  // Moking university.find method
  let unipy;
  // Moking university.findById method
  let unipyFindById;

  beforeAll( () => {
    const university = require('../public/models/university');
    unipy = jest.spyOn(university, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    unipyFindById = jest.spyOn(university, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    unipy.mockRestore();
    unipyFindById.mockRestore();
  });

  test('PUT /api/v1/uni/ should respond 200 and array of filtered edificio event', async () => {
    return request(app)
      .post('/api/v1/uni')
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

  test('PUT /api/v1/uni/titolo should respond 200 and array of filtered title event', async () => {
    return request(app)
      .post('/api/v1/uni')
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

  test('PUT /api/v1/uni/data should respond 200 and array of filtered event date', async () => {
    return request(app)
      .post('/api/v1/uni')
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
