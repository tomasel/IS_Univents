/**
 * https://www.npmjs.com/package/supertest
 */
 const request = require('supertest');
 const app     = require('../app');
 
 //GET
 describe('GET /api/v1/uni', () => {
 
   // Moking university.find method
   let uniSpy;
   // Moking university.findById method
   let uniSpyFindById;
 
   beforeAll( () => {
     const university = require('../public/models/university');
     uniSpy = jest.spyOn(university, 'find').mockImplementation((criterias) => {
       return [{
         title: 'Software Engineering 2'
       }];
     });
     uniSpyFindById = jest.spyOn(university, 'findById').mockImplementation((id) => {
       if (id==1010)
         return {
           title: 'Software Engineering 2'
         };
       else
         return {};
     });
   });
 
   afterAll(async () => {
     uniSpy.mockRestore();
     uniSpyFindById.mockRestore();
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
       .get('/api/v1/uni/629c70ac790828b8c3d5a9af')
       .expect('Content-Type', /json/)
       .expect(200)
   });

   
 
 });


 //POST
 describe('POST /api/v1/uni', () => {
 
  // Moking university.find method
  let uniSpy;
  // Moking university.findById method
  let uniSpyFindById;

  beforeAll( () => {
    const university = require('../public/models/university');
    uniSpy = jest.spyOn(university, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    uniSpyFindById = jest.spyOn(university, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    uniSpy.mockRestore();
    uniSpyFindById.mockRestore();
  });


  test('POST /api/v1/uni should respond 200 and university creato', async () => {
    return request(app)
      .post('/api/v1/uni')
      .expect('Content-Type', /json/)
      .expect(200)
  });

});

 //PUT
 describe('PUT /api/v1/uni', () => {
 
  // Moking university.find method
  let uniSpy;
  // Moking university.findById method
  let uniSpyFindById;

  beforeAll( () => {
    const university = require('../public/models/university');
    uniSpy = jest.spyOn(university, 'find').mockImplementation((criterias) => {
      return [{
        title: 'Software Engineering 2'
      }];
    });
    uniSpyFindById = jest.spyOn(university, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          title: 'Software Engineering 2'
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    uniSpy.mockRestore();
    uniSpyFindById.mockRestore();
  });

  test('PUT /api/v1/uni/ should respond 200 and array of filtered edificio event', async () => {
    return request(app)
      .put('/api/v1/uni/Povo')
      .expect('Content-Type', /json/)
      .expect(200)
  });

  test('PUT /api/v1/uni/titolo should respond 200 and array of filtered title event', async () => {
    return request(app)
      .put('/api/v1/uni/titolo/evento_uni1')
      .expect('Content-Type', /json/)
      .expect(200)
  });

  test('PUT /api/v1/uni/data should respond 200 and array of filtered event date', async () => {
    return request(app)
      .put('/api/v1/uni/data/2022-07-02')
      .expect('Content-Type', /json/)
      .expect(200)
  });

});
