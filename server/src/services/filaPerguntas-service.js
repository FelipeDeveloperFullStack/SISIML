const axios = require('axios')
const usuarioService = require("./usuario-service")
const FilaPerguntas = require("../models/filaPerguntas-model")

exports.obterPerguntasNaoRespondidas = async (req, res) => {
    await usuarioService.buscarUsuarioPorID(req.params.userId).then(user => {
        FilaPerguntas.find({
            seller_id: user.id
        }).then(response => {
            console.log(response)
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
}

exports.buscarEAtualizar = async (req, res) => {
    await usuarioService.buscarUsuarioPorID().then(user => {
        FilaPerguntas.findByIdAndUpdate({
            _id: req.params._id
        }, {
            $set: {
                a: a
            }
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
}

//ANSWERED
//UNANSWERED