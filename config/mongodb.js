const MongoClient = require("mongodb").MongoClient;
var connection = null;
var db = null;
const url = 'mongodb+srv://natan:1597532648@cluster0-q5olm.gcp.mongodb.net/pedidos?retryWrites=true&w=majority'

//const url = 'mongodb://mongo:27017'
const database_name = 'pedidos'

const mongoClient = require("mongodb").MongoClient

function connect(callback){
   if(connection) return callback(null, db);
 
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },(err, conn) => {
        if(err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
            //return callback(err, null);
        }else {
            connection = conn;
            //db = conn.db(database_name);
            db = conn.db(database_name);
            //Model da aplicação
            //db.createCollection('clientes-collection');

            //conn.close();

            return callback(null, db);
        }
    })
}

function disconnect(){
    if(!connection) return true;
    connection.close();
    connection = null;
    return true;
}

//module.exports = {connect}
module.exports = {connect, disconnect}