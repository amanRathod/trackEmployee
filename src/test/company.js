/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let Employee = require('../model/employee')
let Company = require('../model/company')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()

chai.use(chaiHttp)

describe('Company', () => {
    before((done) => {
        Company.remove({}, (err) => {
            done()
        })
    })

    // create company
    describe('/POST createcompany', () => {
        it('it should create a new company', (done) => {
            let company = {
                companyEmail: 'abc@khojo.com',
                companyName: 'khojo',
                companyDescription: 'Find your lost items',
                // companyCreated: '5c9b9f9f9f9f9f9f9f9f9f9', 
            }
            chai.request(server)
                .post('/api/v1/employee/create-company')
                .send(company)
                .set('Authorization', 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzllMTFlOGNmN2RmNDkyYWMxYmQyMCIsImVtYWlsIjoiZXhhbXBsZTQ3QGdtYWlsLmNvbSIsImlhdCI6MTY1MjE1NTk3NSwiZXhwIjoxNjUyMTYzMTc1fQ.gzIlJNR2YvvHU1Ls6aoLFEowMAabAPiIXbwGyJ5sU6s")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    // res.body.should.have.property('companyEmail')
                    // res.body.should.have.property('companyName')
                    // res.body.should.have.property('companyDescription')
                    // res.body.should.have.property('companyCreated')
                    done()
                })
        })
    })

    // get listed  company
    describe('/GET listcompany', () => {
        it('it should GET all the companies', (done) => {
            chai.request(server)
                .get('/api/v1/company/list-company')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('type').eql('success')
                    done()
                })
        })
    })

    // join COmpany
    describe('/POST join Company', () => {
        it('it should join a company', (done) => {
            let company = new Company({
                companyEmail: 'abc@khojo.com',
                companyName: 'khojo',
                companyDescription: 'Find your lost items',
            })
            company.save((err, company) => {
                chai.request(server)
                    .post(
                        '/api/v1/employee/join-company/' +company.id 
                    )
                    .set('Authorization', 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzllMTFlOGNmN2RmNDkyYWMxYmQyMCIsImVtYWlsIjoiZXhhbXBsZTQ3QGdtYWlsLmNvbSIsImlhdCI6MTY1MjE1NTk3NSwiZXhwIjoxNjUyMTYzMTc1fQ.gzIlJNR2YvvHU1Ls6aoLFEowMAabAPiIXbwGyJ5sU6s")
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        done()
                    })
            })
        })
    })

    // leave company
    describe('/POST Leave company', () => {
        it('it should join a company', (done) => {
            let company = new Company({
                companyEmail: 'abc@khojo.com',
                companyName: 'khojo',
                companyDescription: 'Find your lost items',
            })
            company.save((err, company) => {
                chai.request(server)
                    .post('/api/v1/employee/leave-company/' + company.id)
                    .set('Authorization', 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzllMTFlOGNmN2RmNDkyYWMxYmQyMCIsImVtYWlsIjoiZXhhbXBsZTQ3QGdtYWlsLmNvbSIsImlhdCI6MTY1MjE1NTk3NSwiZXhwIjoxNjUyMTYzMTc1fQ.gzIlJNR2YvvHU1Ls6aoLFEowMAabAPiIXbwGyJ5sU6s")
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        done()
                    })
            })
        })
    })
})
