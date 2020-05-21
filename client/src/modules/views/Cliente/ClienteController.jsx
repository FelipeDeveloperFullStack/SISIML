import React from 'react'
import { connect } from 'react-redux'
import ClientView from '../Cliente/ClienteView'
import { Dimmer, Loader } from 'semantic-ui-react'
//import axios from 'axios'
import { CARREGANDO_AGUARDE } from '../../constants/constants'


class ClientController extends React.Component {

    constructor(props){
        super(props)
        document.title = "Clientes"
    }

    render() {
        return (
            <Dimmer.Dimmable dimmer={this.props.store.isLoading}>
                <Dimmer active={this.props.store.isLoading} inverted>
                    <Loader>{CARREGANDO_AGUARDE}</Loader>
                </Dimmer>
                <ClientView result={this.props.store.result}  />
            </Dimmer.Dimmable>
            
        )
    }   
}

const mapStateToProps = (storeApp) => ({
    store: storeApp.cliente
})

export default connect(mapStateToProps, null)(ClientController)

