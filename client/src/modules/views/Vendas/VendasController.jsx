import React from 'react'
import { connect } from 'react-redux'
import VendasView from './VendasView'
import axios from 'axios'
import { DOMAIN, UPDATE_VENDAS } from '../../constants/constants'
//import sendNotification from '../../components/Notification/Notification'
import swal from 'sweetalert'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import _ from 'lodash'


class VendasController extends React.Component {

    constructor(props) {
        super(props)
        document.title = "Vendas"
        this.state = {
            dadosRastreamento: {},
            checkbox: false,
            inputTextMensagem: ''
        }
    }

    enviarMensagem = (msgArray, text) => {
        
        console.log(msgArray)
        console.log(text)
        msgArray.push({
            text: text,
            from: {
                name: msgArray.length !== 0 ? msgArray[0].from.name : 'Sistema'
            }
        })
        console.log(msgArray)
    }

    setInputTextMensagem = (event) => {
        this.setState({inputTextMensagem: event.target.value})
    }

    resetDadosRastreamento = () => {
        this.setState({dadosRastreamento: {}})
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

    gerarEtiqueteEnvioMesmaPLP = async () => {
        let userId = String(localStorage.getItem('@sigiml/id'))
        await axios.post(`${DOMAIN}/vendas/gerarEtiquetaEnvioMesmoPLP/get01/get02/get03/get04/get05/get06/get07/get08/get09/get10/get11/get12/${userId}`, {shipping_ids: this.verificarSeExisteVendasAEnviar().join(",")}).then(response => {

            window.open(response.data);

        }).catch(error => swal('Error', 'Houve um erro ao tentar gerar a etiqueta de envio (PLP)! \n \n ' + error, 'error'))
        
    }

    verificarSeExisteVendasAEnviar = () => {
        let temp = []
        this.props.vendas.filter(venda => {
            if(venda.dados_entrega.status === 'ready_to_ship'){
                temp.push(venda.dados_entrega.id)
            }
        })
        return temp
    }

    obterQuantidadeDelinhasTextArea = (qtde, msgId) => {
        return qtde.map(line => {
            return line.id === msgId ? line.qtdeBarraN : ''
        })
    }

    updateCheckbox = () => {
        let temp = []
        this.props.vendas.map(venda => {
            if(venda.dados_entrega.status === 'ready_to_ship'){
                venda.checkbox = !venda.checkbox
                temp.push(venda)
            }else{
                temp.push(venda)
            }
        })
        this.props.updateVendas(temp)
    }

    setCheckbox = (value) => {
        this.setState({checkbox: value})    
    }

    /*reverseVendas = vendas => {
        _.reverse(vendas)
    }*/


    render() {
        let isShowLoading = this.props.isLoadingVendasPendentes
            && this.props.isLoadingVendasConcluidas
            && this.props.isLoadingVendasEmTransito
            && this.props.isLoadingVendasAEnviar
        //this.reverseVendas(this.props.vendas) /**Inverte as posições do array de vendas - Isso irá mostrar os dados mais recentes */
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
                        setInputTextMensagem={this.setInputTextMensagem}
                        setCheckbox={this.setCheckbox}
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
                        gerarEtiqueteEnvioMesmaPLP={this.gerarEtiqueteEnvioMesmaPLP}
                        enviarMensagem={this.enviarMensagem}
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

const mapDispatchToProps = dispatch => ({
    updateVendas: (vendas) => {
        dispatch({type: UPDATE_VENDAS, data: vendas})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(VendasController)