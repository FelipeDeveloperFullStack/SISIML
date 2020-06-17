const axios = require('axios')
//const usuarioService = require('../services/usuario-service')
const MensagemPosVenda = require("../models/mensagemPosVenda-model")

const salvarBd = async (req, res) => {
    MensagemPosVenda.findOneAndUpdate({ user_id: req.body.userId }, {
        $set: {
            isHabilitarEnvioCompraRealizada: req.body.isHabilitarEnvioCompraRealizada,
            mensagemCompraRealizada: req.body.mensagemCompraRealizada,
            isHabilitarEnvioProdutoEmTransito: req.body.isHabilitarEnvioProdutoEmTransito,
            mensagemProdutoEmTransito: req.body.mensagemProdutoEmTransito,
            isHabilitarEnvioProntoParaRetirarCorreios: req.body.isHabilitarEnvioProntoParaRetirarCorreios,
            mensagemProntoParaRetirarCorreios: req.body.mensagemProntoParaRetirarCorreios,
            isHabilitarEnvioProdutoEntregue: req.body.isHabilitarEnvioProdutoEntregue,
            mensagemProdutoEntregue: req.body.mensagemProdutoEntregue,
        }
    }).then(response => {
        res.send("Atualizado")
    }).catch(err => res.send(err))

    let mensagemPosVenda = new MensagemPosVenda(req.body)
    await mensagemPosVenda.save().then(response => {
        console.info("[MENSAGEM DO SISTEMA] - Mensagem de pos venda salvo no banco de dados!")
        res.status(200).send("OK")
    })
}

module.exports = {
    salvarBd
}