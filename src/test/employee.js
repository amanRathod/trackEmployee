/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let Employee = require('../model/employee')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()

chai.use(chaiHttp)

describe('Employee', () => {
    before((done) => {
        Employee.remove({}, (err) => {
            done()
        })
    })

    // Register User
    describe('/POST Register User', () => {
        it('it should register a user', (done) => {
            let user = {
                email: 'example47@gmail.com',
                password: 'dummyUser@1',
                fullName: 'Dummy User',
            }
            chai.request(server)
                .post('/api/v1/auth/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })
    })

    // // Login User
    describe('/POST login User', () => {
        it('it should login a user', (done) => {
            let user = {
                email: 'example47@gmail.com',
                password: 'dummyUser@1',
            }
            chai.request(server)
                .post('/api/v1/auth/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('token')
                    res.body.should.have.property('image')
                    res.body.should.have.property('fullName')
                    done()
                })
        })
    })

    // get logged in user Data
    describe('/GET logged in user Data', () => {
        it('it should get logged in user data', (done) => {
            chai.request(server)
                .get('/api/v1/employee/employee-data')
                .set('Authorization', 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzllMTFlOGNmN2RmNDkyYWMxYmQyMCIsImVtYWlsIjoiZXhhbXBsZTQ3QGdtYWlsLmNvbSIsImlhdCI6MTY1MjE1NTk3NSwiZXhwIjoxNjUyMTYzMTc1fQ.gzIlJNR2YvvHU1Ls6aoLFEowMAabAPiIXbwGyJ5sU6s")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done();
                });d
            })
        })

})
