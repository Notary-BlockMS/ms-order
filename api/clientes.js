const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const clienteservice = 'http://ms-cliente-new.herokuapp.com/';
const servicoservice = 'http://ms-servico.herokuapp.com/';
const apiGateway = 'http://api-gateway-npr.herokuapp.com/';
var ObjectId = require('mongodb').ObjectID;

module.exports = (app, repository) => {

    app.get('/', async (req, res) => await res.json({ message: 'Funcionando! - Order Microservice' })) //apagavel

    app.get('/pedidos', async (req, res, next) => {
        await repository.getAllPedidos((err, pedido) => {
            if (err) return next(err);
            res.json(pedido);
        });
    })

    app.get('/pedidos/:id', async (req, res, next) => {
        await repository.getPedidoById(req.params.id, async (err, pedido) => {
            console.log("servicoID1: ",pedido);

            if (err) return next(err);
            if (pedido) {
                pedidoId = req.params.id;
                serviceId = pedido._ServiceId;
                clienteId = pedido._ClienteId;
                await request.get(apiGateway + 'servicos/' +
                serviceId, async function (err, response) {
                        //console.log("resposta: ",response.body);
                        var dadosService = JSON.parse(response.body)
                        console.log('asd',dadosService );
                        await request.get(apiGateway + 'clientes/' +
                        clienteId, function (err, response) {
                                
                                var dadosCliente = JSON.parse(response.body)
                                console.log('asd', dadosCliente)
                                var ped = {
                                    "nome": dadosCliente.cliente.nome,
                                    "cpf": dadosCliente.cliente.cpf,                                   
                                    "servico": dadosService.servico.nome,
                                    "valor": dadosService.servico.valor,
                                    "data": pedido.date,
                                    "total": dadosService.servico.valor
                                }
                                res.json(ped);
                                console.log(ped);

                                console.log("SERVICO: ", dadosService)
                                console.log("CLIENTE: ", dadosCliente)
                            });
                    });
            } else {
                return res.json({ message: "Pedido não encontrado" })
            }

        });
    })

    app.post('/criarpedido', async (req, res) => {

        console.log('objId', req.body)
        const _ClienteId = ObjectId(req.body.clientesId);
        const _ServiceId = ObjectId(req.body.servicesId);
        const date = new Date();

        await repository.criarpedido({ '_ClienteId': _ClienteId, '_ServiceId': _ServiceId, 'date': date }, (err, result) => {
            if (err) { res.json({ "success": false, "message": 'Erro ao cadastrar o pedido!' }) }
            else { res.json({ "success": true, "message": 'Pedido cadastrado com sucesso!' }) }
        })
    })

    require('../eureka-helper').registerWithEureka('ms-pedido-service', 8081);
}