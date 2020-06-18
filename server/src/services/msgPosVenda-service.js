const axios = require('axios')
const MensagemPosVendaModel = require("../models/mensagemPosVenda-model")

const saveAndUpdate = async (req, res) => {
    MensagemPosVendaModel.findOne({ user_id: req.body.userId }).then(async response => {
        if(response === null){
            let mensagemPosVenda = new MensagemPosVendaModel(req.body)
            await mensagemPosVenda.save().then(response => {
                console.info("[MENSAGEM DO SISTEMA] - Mensagem de pos venda salvo no banco de dados!")
                res.status(200).send("OK")
            }).catch(err => res.send(err))
        }else{
            MensagemPosVendaModel.findOneAndUpdate({ user_id: req.body.userId }, {
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
                console.info("[MENSAGEM DO SISTEMA] - Mensagem de pos venda atualizada no banco de dados!")
                res.status(200).send("OK")
            }).catch(err => res.send(err))
        }
    }).catch(err => res.send(err))
}

const findMessageByUser = async (req, res) => {
    MensagemPosVendaModel.find({ user_id: req.body.userId }).then(response => {
        res.send(response)
    }).catch(err => res.send(err))
}

module.exports = {
    saveAndUpdate,
    findMessageByUser
}