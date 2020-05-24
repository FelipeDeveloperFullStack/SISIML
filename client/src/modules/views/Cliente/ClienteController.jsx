import React from 'react'
import { connect } from 'react-redux'
import ClientView from '../Cliente/ClienteView'
import { Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'
import { CARREGANDO_AGUARDE, LISTAR_TODOS_CLIENTES, DOMAIN } from '../../constants/constants'
import _ from 'lodash'


class ClientController extends React.Component {

    constructor(props) {
        super(props)
        document.title = "Clientes"
    }

    procurarClientePorNome = (name) => {
        let clienteFiltrado = this.props.store.result.filter(obj => {
            let query = obj.primeiro_nome + " " + obj.last_name+ " "+obj.nickname+ " "+obj.documento
            return query.toLowerCase().includes(name.toLowerCase())
        })
        if(name === ''){
            this.obterTodosClientes()
        }else{
            this.props.updateStateCliente(clienteFiltrado)
        }
    }

    obterTodosClientes = async () => {
        let userId = String(localStorage.getItem('@sigiml/id'))
        await axios.get(`${DOMAIN}/clientes/${userId}`).then(resp => {
            this.props.getClientes(resp.data)
        }).catch(err => console.log("ERROR", err))
    }

    render() {
        return (
            <Dimmer.Dimmable dimmer={this.props.store.isLoading}>
                <Dimmer active={this.props.store.isLoading} inverted>
                    <Loader>{CARREGANDO_AGUARDE}</Loader>
                </Dimmer>
                <ClientView result={this.props.store.result} procurarClientePorNome={this.procurarClientePorNome} />
            </Dimmer.Dimmable>

        )
    }
}

const mapStateToProps = (storeApp) => ({
    store: storeApp.cliente
})

const mapDispatchToProps = dispatch => ({
    updateStateCliente: (result) => {
        dispatch({type: LISTAR_TODOS_CLIENTES, data: result, isLoading: false})
    },
    getClientes: (result) => {
        dispatch({ type: LISTAR_TODOS_CLIENTES, data: _.sortBy(result, [(cliente) => {return cliente.primeiro_nome}]), isLoading: false })
        //dispatch({type: LISTAR_TODOS_CLIENTES, data: result, isLoading: false})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientController)

