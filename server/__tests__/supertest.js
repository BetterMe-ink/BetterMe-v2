const request = require("supertest");
const path = require("path");
const fs = require("fs");
const { assert } = require("console");
const server = "http://localhost:4000";




//root server testing
describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200)
          .then((response)=>{
            assert(response.body, "welcome to server") //i don't undrtand
          })
        })
      })
      it("Incorrect backend route sends 302 error", () => {
        return request(server)
        .get("/wrong")
        .expect(302)
      })
    })
    describe("User Router", () => {
      describe("A user can sign up", () => {
        it("If successful, responds with 200, and req.body contains newUser", ()=>{
          const [testName, testUsername, testEmail, testPass] = createInfo()
          return request(server)
          .post('/users')
          .send({
            "fullName": testName,
            "username": testUsername, 
            "password": testPass, 
            "email": testEmail
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toHaveProperty('fullname', testName)
            expect(response.headers['set-cookie']).toBeTruthy()
          })
        })

        it("If userInformation already exists, responds with 500", ()=>{
          return request(server)
          .post('/users')
          .send({
            "fullName": "test test",
            "username": "testtest", 
            "password": "test", 
            "email": "test@test.test"
          })
          .expect('Content-Type', /json/)
          .expect(500)
        })

        it("If User Information already exists, responds with 500", ()=>{
          return request(server)
          .post('/users')
          .send({
            "fullName": "test test",
            "username": "testtest", 
            "password": "test", 
            "email": "test@test.test"
          })
          .expect('Content-Type', /json/)
          .expect(500)
        })
      })
    })
    
    describe("A user can log in", () => {
        it('If successfully logged in, should get logged in message', ()=>{
          return request(server)
          .post('/users/login')
          .send({
            "username": "testtest", 
            "password": "test"
          })
          .then((response) => {
            expect(response.body).toBeTruthy()
          })
        })

        it('If wrong password', () => {
            return request(server)
            .post('/users/login')
            .send({
                "username": "testtest", 
                "password": "teXst", 
            })
            .expect(400)
        });
    })
    
    describe("A user should be able to update their user information", () => {
      it("Should respond with 200 and updated user cookie", () => {
        const [testName, testUsername, testEmail, testPass] = createInfo()
        return request(server)
        .post('/users')
        .send({
          "fullName": testName,
          "username": testUsername, 
          "password": testPass, 
          "email": testEmail
        })
        .then((response) => {
          return request(server)
          .put(`/users/${response.body.user_id}`)
          .send({
            "fullName": 'test test',
            "username": testUsername, 
            "password": testPass, 
            "email": testEmail
          })
          .then((response)=>{
            assert(response.body, 'User Details updated successfully')
            expect(response.headers['set-cookie']).toBeTruthy()
          })
        })
      })
  })
})


  const createInfo=()=>{
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const length = 14;
      let testName = ""
      let testUsername = ""
      let testPass = ""
      let testEmail = ""
      for (let i = 0; i < length; i++) {
        testName += characters.charAt(  
        Math.floor(Math.random() * characters.length)
        );
        testUsername += characters.charAt(  
          Math.floor(Math.random() * characters.length)
        );
        testPass += characters.charAt(  
          Math.floor(Math.random() * characters.length)
        );
        if (i === 8) testEmail += '@'
        if (i === 12) testEmail += '.'
        testEmail += characters.charAt(  
          Math.floor(Math.random() * characters.length)
        );
      }
      return [testName, testUsername, testPass, testEmail]
  }