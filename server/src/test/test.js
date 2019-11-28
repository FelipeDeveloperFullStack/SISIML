const firebase = require('../config/firebase');
const axios = require("axios");
const constants = require('../constants/constants');
const usuarioService = require('../services/usuario-service')
const anuncioService = require('../services/anuncio-service')

const usuario = {
    id: 3311227,
    access_token: "78l~987lõ87op´1928373847",
    email: "pedromelo@gmail.com",
    first_name: "Pedro",
    nick_name: "Americana",
    refresh_token: "7op9870op987ó0987928370984705"
}

const usuario02 = {
    id: 987654,
    access_token: "8888888888888888888888888",
    email: "comproline.ecoomercer@gmail.com",
    first_name: "Felipe",
    nick_name: "COMPROLINE COMERCIO DE PRODUTOS ONLINE",
    refresh_token: "987P98P798P798P798P79P879P87"
}

const usuario03 = {
    id: 336659,
    access_token: "22222222222222555444411111",
    email: "jurubeba@gmail.com",
    first_name: "João",
    nick_name: "JOAOANTONIO",
    refresh_token: "0Q02Q02Q01W01W01A01A10A98A"
}

const editarUsuario = async () => {
    await axios.put("https://sisiml.firebaseio.com/usuarios.json", usuario).then(resp => {
        console.log("Usuario salvo com sucesso!" + resp);
    }).catch(err => {
        console.log("Houve um erro ao salvar o usuario no firebase: " + err);
    });
}

const salvarUsuario = async () => {
    await axios.post("https://sisiml.firebaseio.com/usuarios.json", usuario03).then(resp => {
        console.log("Usuario salvo com sucesso!" + resp);
    }).catch(err => {
        console.log("Houve um erro ao salvar o usuario no firebase: " + err);
    });
}

const listarTodosUsuarios = async () => {
    const usuarios = await axios.get("https://sisiml.firebaseio.com/usuarios.json").then(resp => {
        return resp.data;
    }).catch(err => {
        console.log("Houve um erro ao listar todos os usuarios: " + err)
    });
    return usuarios;
}

const buscarUsuarioPorID = async () => {
    const usuarios = await axios.get(constants.urlbase.COLLECTION_USUARIOS).then(resp => {
        return resp.data;
    }).catch(err => {
        console.log("Houve um erro ao listar todos os usuarios: " + err)
    });
    return usuarios;
}

const getTodosAnuncios = async () => {
    buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/users/${resp.id}/items/search?search_type=scan&access_token=${resp.accessToken}`).then(response => {
            var detalhesAnuncio = response.data.results.map(result => {
                return axios.get(`https://api.mercadolibre.com/items/${result}/`).then(res => {
                    return axios.get(`https://api.mercadolibre.com/visits/items?ids=${result}`).then(resp => {
                        var anuncio = {
                            id: res.data.id,
                            titulo: res.data.title,
                            preco: res.data.price,
                            estoque_total: res.data.available_quantity,
                            foto_principal: res.data.pictures[0].url,
                            link_anuncio: res.data.permalink,
                            status: res.data.status,
                            visualizacao: Object.values(resp.data).reduce((accumulador, valorCorrente) => { return valorCorrente })
                        }
                        return anuncio;
                    }).catch(err => {

                    })

                }).catch(err => {
                    console.log("Houve um erro ao buscar os detalhes do anuncio: " + err)
                });
            })

            Promise.all(detalhesAnuncio).then(resp => {
                console.log(resp)
            });

        }).catch(err => {
            console.log("Houve um erro ao listar todos os anuncios: " + err)
        });
    })
}

const obterTotalDeVendas = async () => {
    var data = new Date();
    buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/orders/search?seller=${resp.id}&order.status=paid&order.date_created.from=2019-${data.getMonth()+1}-01T00:00:00.000-00:00&order.date_created.to=2019-${data.getMonth()+1}-30T00:00:00.000-00:00&&access_token=${resp.accessToken}`).then(resp => {
            console.log({total: resp.data.results.length+1})
        }).catch(err => {
            console.log({ mensagem: "Houve um erro ao buscar todas as vendas realizadas: " + err })
        })
    })

}
const obterVendasPendentes = async () => {
    usuarioService.buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/orders/search/pending?seller=${resp.id}&access_token=${resp.accessToken}`).then(response => {
            response.data.results.filter(value => value.payments[0].status === 'pending').map(value => {
                anuncioService.obterFotoPrincipalAnuncio(value.order_items[0].item.id).then(res => {
                    console.log(res)
                }) 
            })
        }).catch(err => {
            console.log(err)
        })
    })
}


//salvarUsuario();
//salvarUsuarioAPI();
//listarViaAPI();
obterVendasPendentes()
