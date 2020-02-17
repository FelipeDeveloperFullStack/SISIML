const axios = require('axios')
const usuarioService = require('../services/usuario-service')
const constants = require('../constants/constants')
const { rastro } = require('rastrojs')
const util = require('../helpers/util')

const obterDadosVendasPorCliente = async (id) => {
    usuarioService.buscarUsuarioPorID().then(async user => {
        await axios.get(`${constants.API_MERCADO_LIVRE}/orders/search?seller=${user.id}&access_token=${user.accessToken}`).then(orders => {
            let vendas = orders.data.results.filter(ordersClient => {
                return ordersClient.buyer.id == id
            })
            let vendasClient = vendas.map(value => {
                return value.order_items.reduce((acumulador, order_item) => {
                    return order_item
                })
            })
                let valor_venda = vendasClient.map(valorCorrente => { return valorCorrente.unit_price })
                let dados = {
                    totalCompras: valor_venda.reduce((acumulador, valorCorrent) => { return acumulador + valorCorrent }),
                    quantidadeCompras: valor_venda.length,
                    tituloAnuncio: vendasClient[0].item.title,
                    IDAnuncio: vendasClient[0].item.id
                }
                axios.put('https://sisiml.firebaseio.com/cliente.json', {dados_cliente: dados}).then(response =>{
                    //OK
                }).catch(error =>console.log(error))
        }).catch(error =>console.log(error))
    }).catch(error => console.log(error))
}

exports.obterDadosCliente = async (req, res) => {
    usuarioService.buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/orders/search?seller=${resp.id}&access_token=${resp.accessToken}`).then(resp => {
            let clientes = resp.data.results.filter(function (a) {
                //Evita os IDs duplicados
                return !this[JSON.stringify(a.buyer.id)] && (this[JSON.stringify(a.buyer.id)] = true)

            }, Object.create(null)).map(value => {

                return axios.get('https://api.mercadolibre.com/users/' + value.buyer.id).then(resp => {
                    var dadosClient = {
                        id: value.buyer.id,
                        nickname: value.buyer.nickname,
                        numero_contato: util.tratarNumeroCelularComDDD(value.buyer.phone.area_code, value.buyer.phone.number) === null ?
                            'Não informado' : 'https://api.whatsapp.com/send?phone=55' + util.tratarNumeroCelularComDDD(value.buyer.phone.area_code, value.buyer.phone.number) + '',
                        ddd: value.buyer.phone.area_code,
                        primeiro_nome: value.buyer.first_name,
                        last_name: value.buyer.last_name,
                        tipo_documento: value.buyer.billing_info.doc_type,
                        documento: value.buyer.billing_info.doc_number === undefined ||
                            value.buyer.billing_info.doc_number === null ? 'Não informado' : value.buyer.billing_info.doc_number,
                        cidade: resp.data.address.city,
                        estado: JSON.parse(JSON.stringify(resp.data.address.state).replace("BR-", "")),
                        valorCompra: value.order_items[0].unit_price.toFixed(2),
                        vendasClient: obterDadosVendasPorCliente(value.buyer.id)
                    }
                    return dadosClient
                }).catch(err => res.send(err))
            })

            Promise.all(clientes).then((resultado) => {
                res.send(resultado).status(200)
            })

        }).catch(err => {
            res.send({ mensagem: "Houve um erro ao buscar todas as vendas realizadas: " + err })
        })
    })
}