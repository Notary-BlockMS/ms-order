const test = require('tape');
const mongodb = require('./mongodb');
 
function runTests(){
    test('MongoDB Connection', (t) => {
        mongodb.connect((err, conn) => {
            t.assert(mongodb.disconnect(), "Connection established");
            t.end();
        });
    })
 
    test('MongoDB Disconnection', (t) => {
        t.assert(mongodb.disconnect(), "Disconnected");
        t.end();
    })
}
 
module.exports = { runTests }

