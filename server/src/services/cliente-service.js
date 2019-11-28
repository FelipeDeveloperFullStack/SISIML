const axios = require('axios')
const usuarioService = require('../services/usuario-service')
const constants = require('../constants/constants')

exports.obterDadosClient = async (req, res) => {
    usuarioService.buscarUsuarioPorID().then(resp => {
         axios.get(`${constants.API_MERCADO_LIVRE}/orders/search?seller=${resp.id}&order.status=paid&access_token=${resp.accessToken}`).then(resp => {
           let clientes = resp.data.results.filter(function (a) {
                //Evita os IDs duplicados
                return !this[JSON.stringify(a.buyer.id)] && (this[JSON.stringify(a.buyer.id)] = true)
            }, Object.create(null)).map(value => {
                var dadosClient = {
                    id: value.buyer.id,
                    nickname: value.buyer.nickname,
                    numero_contato: value.buyer.phone.number,
                    ddd: value.buyer.phone.area_code,
                    primeiro_nome: value.buyer.first_name,
                    last_name: value.buyer.last_name,
                    tipo_documento: value.buyer.billing_info.doc_type,
                    documento: value.buyer.billing_info.doc_number		
                }
                return dadosClient
            })

            Promise.all(clientes).then(resultado => {res.send(resultado)})
            
        }).catch(err => {
            res.send({ mensagem: "Houve um erro ao buscar todas as vendas realizadas: " + err })
        })


    })
}