import React from 'react'
import { connect } from 'react-redux'
import VendasView from './VendasView'
import axios from 'axios'
import { DOMAIN } from '../../constants/constants'
//import sendNotification from '../../components/Notification/Notification'
import swal from 'sweetalert'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
//import socketIOClient from 'socket.io-client'


class VendasController extends React.Component {

    constructor(props) {
        super(props)
        document.title = "Vendas"
        this.state = {
            dadosRastreamento: {},
            checkbox: false
        }
    }

    resetDadosRastreamento = () => {
        this.setState({dadosRastreamento: {}})
    }

    componentDidMount = async () => {
    
        /*const socket = socketIOClient(DOMAIN)
        socket.on('ml-notification-perguntas', (data) => {
            console.log("message: "+data);
            
          });*/
    }

    obterRastreioCorreios = async (codigo) => {
        await axios.get(`${DOMAIN}/rastreio/${codigo}`).then(response => {
            this.setState({
                dadosRastreamento: response.data,
                isLoading: false
            })
        })
    }

    gerarEtiqueteEnvio = async (shippingId) => {
        let userId = String(localStorage.getItem('@sigiml/id'))
        await axios.get(`${DOMAIN}/vendas/gerarEtiquetaEnvio/get01/get02/get03/get04/get05/get06/get07/get08/get09/get10/${shippingId}/${userId}`).then(response => {

            window.open(response.data);

        }).catch(error => swal('Error', 'Houve um erro ao tentar gerar a etiqueta de envio! \n \n ' + error, 'error'))
    }

    obterQuantidadeDelinhasTextArea = (qtde, msgId) => {
        return qtde.map(line => {
            return line.id === msgId ? line.qtdeBarraN : ''
        })
    }

    updateCheckbox = (value, id_venda) => {
        console.log(value, id_venda)
        this.setState({checkbox: value})    
    }


    render() {
        let isShowLoading = this.props.isLoadingVendasPendentes
            && this.props.isLoadingVendasConcluidas
            && this.props.isLoadingVendasEmTransito
            && this.props.isLoadingVendasAEnviar
        return (
            <>
                <Dimmer.Dimmable dimmer={isShowLoading.toString()}>
                    
                    <Dimmer active={isShowLoading} inverted>
                        <Loader>Carregando dados do Mercado Livre, por favor aguarde...</Loader>
                    </Dimmer>

                    <VendasView
                        {...this.state}
                        resetDadosRastreamento={this.resetDadosRastreamento}
                        vendas={this.props.vendas}
                        updateCheckbox={this.updateCheckbox}
                        obterRastreioCorreios={this.obterRastreioCorreios}
                        dadosRastreamento={this.state.dadosRastreamento}
                        gerarEtiqueteEnvio={this.gerarEtiqueteEnvio}
                        obterQuantidadeDelinhasTextArea={this.obterQuantidadeDelinhasTextArea}
                        isLoading={this.props.isLoading}
                        isLoadingQtdeVendasAEnviar={this.props.isLoadingQtdeVendasAEnviar}
                        isLoadingQtdeVendasEmTransito={this.props.isLoadingQtdeVendasEmTransito}
                        qtdeVendasConcluidas={this.props.qtdeVendasConcluidas}
                        qtdeVendasCanceladas={this.props.qtdeVendasCanceladas}
                        qtdeVendasEmTransito={this.props.qtdeVendasEmTransito}
                        qtdeVendasPendentes={this.props.qtdeVendasPendentes}
                        qtdeVendasAEnviar={this.props.qtdeVendasAEnviar}
                        qtdeVendasEmTransito={this.props.qtdeVendasEmTransito}
                        />
                </Dimmer.Dimmable>
            </>
        )
    }
}

const mapStateToProps = store => ({
    vendas: store.venda.vendas,
    isLoading: store.venda.isLoading,
    isLoadingQtdeVendasAEnviar: store.venda.isLoadingQtdeVendasAEnviar,
    isLoadingQtdeVendasEmTransito: store.venda.isLoadingQtdeVendasEmTransito,
    qtdeVendasConcluidas: store.venda.qtdeVendasConcluidas,
    qtdeVendasCanceladas: store.venda.qtdeVendasCanceladas,
    qtdeVendasEmTransito: store.venda.qtdeVendasEmTransito,
    qtdeVendasPendentes: store.venda.qtdeVendasPendentes,
    qtdeVendasAEnviar: store.venda.qtdeVendasAEnviar,
    qtdeVendasEmTransito: store.venda.qtdeVendasEmTransito,
    isLoadingVendasPendentes: store.venda.isLoadingVendasPendentes,
    isLoadingVendasConcluidas: store.venda.isLoadingVendasConcluidas,
    isLoadingVendasEmTransito: store.venda.isLoadingVendasEmTransito,
    isLoadingVendasAEnviar: store.venda.isLoadingVendasAEnviar
})

export default connect(mapStateToProps)(VendasController)