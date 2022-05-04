import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js';

chai.use(chaiHttp);
const api = chai.request(server).keepOpen();
const { expect } = chai;

describe('User workflow tests', () => {
  it('should register + login a user', done => {
    // 1) Register new user
    const user = {
      name: 'Kalisa Kelvin',
      email: 'kalisakelvin@andela.com',
      password: 'andela123',
      passwordConfirm: 'andela123',
      role: "admin"
    };
        // 2) Login the user
       api
          .post('/api/v1/users/login')
          .send({
            email: 'kalisakelvin@andela.com',
            password: 'andela123'
          })
          .end((err, res) => {
            console.log("gtrhth",err, res)
       
            done();
            
                
                });
    
            }).timeout(30000);
  
    it('should register + login a user, create blog and verify 1 in  DATABASE', done => {
      // 1) Register new user
      const user = {
        name: 'Kalisa Kevin',
        email: 'kalisakevin@andela.com',
        password: 'andela123',
        passwordConfirm: 'andela123',
        role: "admin"
      };
     api
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          console.log("gtrhth",res)
          // Asserts
          expect(res.status).to.be.equal(201);
          expect(res.body).to.be.a('object');
          expect(res.body.error).to.be.equal(undefined);
  
          // 2) Login the user
         api
            .post('/api/v1/users/login')
            .send({
              email: 'kalisakevin@andela.com',
              password: 'andela123'
            })
            .end((err, res) => {
             
              // Asserts
              expect(res.status).to.be.equal(200);
              expect(res.body.error).to.be.equal(undefined);
              const { token } = res.body;
  
              // 3) Create new blog
              const blog = {
                title: 'VISIT RWANDA',
                body: 'Hello Rwanda',
                date: '2020-04-05'
              };
             api
             .post('/api/v1/blogs')
             .set({'Cookie': `JWT=${token}`})
                .send(blog)
                .end((err, res) => {
                  console.log("gtrhth",res)
                  // Asserts
                  expect(res.status).to.be.equal(201);
                  expect(res.body).to.be.a('object');
  
                  const savedBlog = res.body.data.blog;
                  expect(savedBlog.title).to.be.equal(blog.title);
                  expect(savedBlog.body).to.be.equal(blog.body);
  
                  // 4) Verify one blog in test DB
                  const blogId = savedBlog._id;
                 api
                    .get(`/api/v1/blogs/${blogId}`)
                    .end((err, res) => {
                      console.log("gtrhth",err, res)
                      // Asserts
                      expect(res.status).to.be.equal(200);
                      expect(res.body).to.be.a('object');
                      done();
                    });
                  });
                });
              });
    }).timeout(30000);
  
    it('should register + login a user, create blog and delete it from DB', done => {
      // 1) Register new user
      const user = {
        name: 'Karera Kevin',
        email: 'karerakevin@andela.com',
        password: 'andela123',
        passwordConfirm: 'andela123',
        role: "admin"
      };
     api
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          console.log("gtrhth",err, res)
          // Asserts
          expect(res.status).to.be.equal(201);
          expect(res.body).to.be.a('object');
          expect(res.body.error).to.be.equal(undefined);
  
          // 2) Login the user
         api
            .post('/api/v1/users/login')
            .send({
              email: 'karerakevin@andela.com',
              password: 'andela123'
            })
            .end((err, res) => {
              console.log("gtrhth",err, res)

              // Asserts
              expect(res.status).to.be.equal(200);
              expect(res.body.error).to.be.equal(undefined);
              const { token } = res.body;
  
              // 3) Create new blog
              const blog = {
                title: 'Home sweet home',
                body: 'Hello world Home',
                date: '2022-02-01'
              };
  
             api
             .post('/api/v1/blogs')
             .set({'Cookie': `JWT=${token}`})
                .send(blog)
                .end((err, res) => {
                  // Asserts
                  expect(res.status).to.be.equal(201);
                  expect(res.body).to.be.a('object');
  
                   const savedBlog = res.body.data.blog;
                  expect(savedBlog.title).to.be.equal(blog.title);
                  expect(savedBlog.body).to.be.equal(blog.body);
  
                  // 4) Delete blog
                 api
                 .delete(`/api/v1/blogs/${savedBlog._id}`)
                 .set({'Authorization': `Bearer ${token}`})
                    .end((err, res) => {
                      expect(res.status).to.be.equal(204);
                      done();
                    });
                });
            });
        });
    }).timeout(30000);
  
    
    it('should register user with invalid input', done => {
      // Register new user with invalid inputs
      const user = {
        name: 'Kalimba kevin',
        email: 'kalimbakevin25gmail.c', //Faulty email validation should catch this...
        password: 'andela123',
        passwordConfirm: '12345'
      };
     api
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          console.log("gtrhth",err, res)
          done();
        });
    }).timeout(30000);
  
    }).timeout(30000);
  
  

 