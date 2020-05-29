const express = require('express')
const router = express.Router()
const usuarioService = require("../services/usuario-service")
const axios = require('axios')
const FilaPerguntas = require('../models/filaPerguntas-model')

module.exports = (io) => {

    router.post('/', (req, res) => {
        usuarioService.buscarUsuarioPorID(req.body.user_id).then(async user => {
            if (req.body.topic === 'questions') {
                let resource = req.body.resource.split('').filter(caracter => { return Number(caracter) || caracter == 0 }).join('') //Obtem apenas o número de EX: /questions/5036111111, devolvendo apenas o 5036111111
                await axios.get(`https://api.mercadolibre.com/questions/${resource}?access_token=${user.accessToken}`).then(async question => {
                    await axios.get(`https://api.mercadolibre.com/items/${question.data.item_id}`).then(async item => {
                        await axios.get(`https://api.mercadolibre.com/users/${question.data.from.id}`).then(userName => {
                            question.data.title = item.data.title
                            question.data.nick_name = userName.data.nickname
                            salvarNotificacaoFilaBD(question.data)
                            io.emit('notification-ml', question.data)
                            res.send(question.data)
                            console.log(req.body)
                        })
                    })
                })
            }
            if(req.body.topic === 'orders_v2'){
                console.log("Nova venda \n")
                console.log(req.body)
                console.log("Nova venda \n")
                res.send("Nova venda")
            }
        }).catch(error => res.send(error))
    })

    const salvarNotificacaoFilaBD = (body) => {
        /*let filaPerguntas = new FilaPerguntas(body)
        filaPerguntas.save().then(response => {
            console.log("Notificacoes salvo no banco de dados!")
        })*/

        FilaPerguntas.findOne({ id: body.id }).then(response => {
            if (response === null) {
                let filaPerguntas = new FilaPerguntas(body)
                filaPerguntas.save().then(response => {
                    console.log("Notificacoes salvo no banco de dados!")
                }).catch(error => console.log(error))
            }else{
                FilaPerguntas.findOneAndUpdate({ id: body.id }, {$set: {status: body.status}}).then(response => {
                    console.log("Notificacoes atualizada no banco de dados!")
                }).catch(error => console.log(error))
            }
        }).catch(error => console.log(error))

    }

    router.post('/responder/:userId', (req, res) => {
        usuarioService.buscarUsuarioPorID(req.params.userId).then(user => {
            axios.post(`https://api.mercadolibre.com/answers?access_token=${user.accessToken}`, req.body).then(response => {
                res.send({ isRespondido: true })
            }).catch(error => res.send(error))
        }).catch(error => res.send(error))
    })

    return router
}



