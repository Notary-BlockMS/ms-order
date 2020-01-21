const test = require('tape');
const supertest = require('supertest');
const clientes = require('./clientes');
const server = require("../server/server");
const repository = require("../repository/repository");


function runTests() {
    var app = null;
    server.start(clientes, repository, (err,app) => {
        var id = null;
        test('GET /clientes', (t) => {
            supertest(app)
            .get('/clientes')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(res.body && res.body.length > 0) id = res.body[0]._id;
                    t.error(err, 'No errors')
                    t.assert(res.body && res.body.length > 0, "All Clients returned!")
                    t.end()
            })
        })

        test('GET /clientes/:id', (t) => {
            if(!id) {
                t.assert(false, "Cliente by Id Returned");
                t.end();
                return;
            }
 
            supertest(app)
                .get('/clientes/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "Clientes By Id returned")
                    t.end()  
                })
        })

        server.stop();
    })
}

module.exports = {runTests}