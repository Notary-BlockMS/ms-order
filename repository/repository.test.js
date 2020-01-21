const test = require('tape');
const repository = require('./repository');
 
function runTests(){
 
    var id = null;
 
    test('Repository GetAllClients', (t) => {
        repository.getAllClients((err, clients) => {
            if(clients && clients.length > 0) id = clients[0]._id;            
            t.assert(!err && clients && clients.length > 0, "All Clients Returned");
            t.end();
        })
    })

    test('Repository GetClientsById', (t) => {
        if(!id){
            t.assert(false, "Cliente by Id Returned");
            t.end();
            return;
        }
    })

}

module.exports = { runTests }