const axios = require('axios')
//const usuarioService = require('../services/usuario-service')
const MensagemPosVenda = require("../models/mensagemPosVenda-model")

const salvarBd = async (req, res) => {
    let mensagemPosVenda = new MensagemPosVenda(req.body)    
    await mensagemPosVenda.save().then(response => {
        console.info("[MENSAGEM DO SISTEMA] - Mensagem de pos venda salvo no banco de dados!")
        res.status(200).send("OK")
    })
}

module.exports = {
    salvarBd
}