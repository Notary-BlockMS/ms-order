const mongodb = require("../config/mongodb")

function getAllPedidos(callback){
    mongodb.connect((err, db) => {
        db.collection("pedidos").find().toArray(callback);
    })
}

function getPedidoById(id, callback){
    mongodb.connect((err, db) => {
        db.collection("pedidos").findOne({
            _id: require("mongodb").ObjectId(id)}, callback);
    });
}

function criarpedido(pedido, callback){
    mongodb.connect((err, db) => {
        db.collection("pedidos").insertOne(pedido, callback)
    });
}

function disconnect() {
    return mongodb.disconnect();
}

module.exports = {getAllPedidos, getPedidoById, disconnect, criarpedido}