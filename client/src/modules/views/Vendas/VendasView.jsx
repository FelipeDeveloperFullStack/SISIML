import React from 'react'
import '../../../assets/css/Global/style.css'
import { Row, Col } from "react-bootstrap"
import Panel from '../../components/Panel/Panel'
import imgParaPreparar from '../../../assets/img/delivery-box-icon128px.png'
import imgProntoParaEnviar from '../../../assets/img/delivery-truck-icon128px.png'
import imgConcluido from '../../../assets/img/Accept-icon128px.png'
import { Divider, Icon, Step } from 'semantic-ui-react'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SmsIcon from '@material-ui/icons/Sms';
import iconPagamentoConfirmado from '../../../assets/img/success-icon16px.png'
import iconCustoEnvio from '../../../assets/img/delete-icon16px.png'
import RoomIcon from '@material-ui/icons/Room';
import Avatar from '@material-ui/core/Avatar';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import GoogleMaps from '../../components/GoogleMaps/GoogleMaps'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import IconButton from '@material-ui/core/IconButton';

export default class VendasView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            status_envio: '',
            badgeSucess: 'badge badge-success',
            badgeDange: 'badge badge-danger'
        }
    }

    getStatusEmTransito = () => {
        //console.log({ status_envio: 'shipped' })
        this.setState({ status_envio: 'shipped' })
    }

    getStatusEntregue = () => {
        console.log({ status_envio: 'delivered' })
        this.setState({ status_envio: 'delivered' })
    }

    getTraduzirStatusEnvio = status_envio => {
        if (status_envio === 'shipped') {
            return 'EM TRÂNSITO'
        }
        if (status_envio === 'delivered') {
            return 'ENTREGUE'
        }
    }

    render() {
        return (
            <div className="content">
                <div >
                    <div >
                        <Row>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Step.Group>
                                    <Step active href="#">
                                        <Avatar alt="concluido" src={imgParaPreparar} />
                                        <Step.Content style={{ 'marginLeft': '10px' }}>
                                            <Step.Title>Pendentes</Step.Title>
                                            <Step.Description>0 vendas</Step.Description>
                                        </Step.Content>
                                    </Step>

                                    <Step active href="#">
                                        <Avatar alt="concluido" src={imgProntoParaEnviar} />
                                        <Step.Content style={{ 'marginLeft': '10px' }}>
                                            <Step.Title>Pronto para enviar</Step.Title>
                                            <Step.Description>5 vendas</Step.Description>
                                        </Step.Content>
                                    </Step>

                                    <Step active onClick={() => this.getStatusEmTransito()}>
                                        <Icon name="truck" />
                                        <Step.Content style={{ 'marginLeft': '10px' }}>
                                            <Step.Title>Em trânsito</Step.Title>
                                            <Step.Description>13 vendas</Step.Description>
                                        </Step.Content>
                                    </Step>

                                    <Step active onClick={() => this.getStatusEntregue()}>
                                        <Avatar alt="concluido" src={imgConcluido} />
                                        <Step.Content style={{ 'marginLeft': '10px' }}>
                                            <Step.Title>Concluídas</Step.Title>
                                            <Step.Description>69 vendas</Step.Description>
                                        </Step.Content>
                                    </Step>
                                </Step.Group>

                            </Grid>
                        </Row>
                        <Divider />
                    </div>
                </div>
                {this.props.vendas.map((venda, key) => {

                    if (venda.dados_entrega.status === this.state.status_envio) {
                        return (
                            <Paper elevation={3}>
                                <Panel style={{ 'backgroundColor': '#1976d2', 'color': 'white' }} key={key} title={<div>Pedido <span className="badge badge-success" style={{ 'color': 'white' }}>
                                    {this.getTraduzirStatusEnvio(this.state.status_envio)}</span> - Nº #{venda.id_venda} - {venda.itens_pedido.titulo_anuncio}
                                </div>}
                                    content={
                                        <>
                                            <Row>
                                                <Col md={6}>

                                                    <Card>
                                                        <CardActionArea>
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    Nome: {venda.comprador.first_name_comprador} {venda.comprador.last_name_comprador}
                                                                </Typography>
                                                                <Typography variant="body2" component="p">
                                                                    <strong>Usuário:</strong> {venda.comprador.nickname_comprador}  <strong>CPF:</strong> {venda.comprador.documento_comprador}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button
                                                                variant="contained"
                                                                style={{ 'color': 'white', 'backgroundColor': 'green' }}
                                                                startIcon={<WhatsAppIcon />}>
                                                                <a href={venda.comprador.whatsapp} style={{ 'color': 'white' }} target='_blank' data-toggle="tooltip" title='Enviar mensagem WhatsApp'>Enviar mensagem WhatsApp</a>
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                style={{ 'color': 'black', 'backgroundColor': '#ffe600' }}
                                                                startIcon={<SmsIcon />}>
                                                                Enviar Mensagem Mercado Livre
                                                            </Button>
                                                        </CardActions>
                                                    </Card>

                                                </Col>

                                                <Col md={6}>
                                                    <Paper elevation={3}>
                                                        {/** 
                                                     * <Card fluid color='blue'>
                                                        <Card.Content>
                                                            <Card.Header style={{ 'marginLeft': '-15px' }}>
                                                                <img src={iconMoney}></img>{' '}
                                                                Pagamento
                                                        </Card.Header>
                                                            <Card.Meta>{venda.data_venda}</Card.Meta>
                                                            <Divider />
                                                            <Card.Description style={{ 'height': '65px' }}>
                                                                <p>
                                                                    <img src={iconPagamentoConfirmado}></img>{' '}
                                                                    <span style={{ 'color': '#19b698', 'fontSize': '18px', 'fontFamily': 'Open Sans' }}>R$ {venda.dados_pagamento[0].total_pago.toFixed(2).toLocaleString('pt-BR')}</span>
                                                                    <span className={venda.dados_pagamento[0].status_pagamento === 'approved' ? this.state.badgeSucess : this.state.badgeDange}
                                                                        style={{ 'color': 'white', 'marginLeft': '115px' }}>{venda.dados_pagamento[0].status_pagamento === 'approved' ? 'Aprovado' : 'Estornado'}</span>
                                                                    <img src={iconCustoEnvio}></img>{' '}
                                                                    <span>Frete: {venda.dados_pagamento[0].custo_envio.toFixed(2).toLocaleString('pt-BR')}</span>
                                                                </p>

                                                                <span>Tipo de pagamento: {venda.dados_pagamento[0].tipoPagamento}</span>

                                                            </Card.Description>
                                                        </Card.Content>
                                                    </Card>
                                                    */}

                                                        <Card>

                                                            <CardContent>

                                                                <Row>
                                                                    <Col md={6}>
                                                                        <div>Data da venda: <b>{venda.data_venda}</b></div>
                                                                        <div>Valor do produto: <b>R$ {venda.valor_venda.toLocaleString('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' })}</b></div>
                                                                        <div>
                                                                            Status de pagamento:
                                                                                <div className={venda.dados_pagamento[0].status_pagamento === 'approved' ? this.state.badgeSucess : this.state.badgeDange}
                                                                                style={{ 'color': 'white', 'fontSize': '10px', 'marginLeft': '5px' }}>{venda.dados_pagamento[0].status_pagamento === 'approved' ? 'Aprovado' : 'Estornado'}</div>
                                                                        </div>
                                                                        <div>Custo de envio: <b>R$ {venda.dados_pagamento[0].custo_envio.toLocaleString('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' })}</b></div>
                                                                        <div>Valor pago: <b>R$ {venda.dados_pagamento[0].total_pago.toLocaleString('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' })}</b></div>
                                                                    </Col>

                                                                    <Col md={6}>
                                                                        {venda.dados_pagamento[0].boleto_url !== null &&
                                                                            <Button
                                                                                variant="contained"
                                                                                style={{ 'color': 'white', 'marginBottom': '20px' }}
                                                                                color='default'
                                                                                startIcon={<PictureAsPdfIcon color="primary"/>}>
                                                                                <a style={{ 'color': 'black' }} href={venda.dados_pagamento[0].boleto_url} target='_blank' rel="noopener noreferrer">Boleto</a>
                                                                            </Button>
                                                                        }
                                                                        <div>Método de pagamento: <b>{venda.dados_pagamento[0].metodoPagamento}</b></div>
                                                                        <div>Tipo de pagamento: <b>{venda.dados_pagamento[0].tipoPagamento}</b></div>
                                                                    </Col>

                                                                </Row>


                                                            </CardContent>


                                                        </Card>
                                                    </Paper>
                                                </Col>

                                            </Row>
                                            <Divider />
                                            <Row>
                                                <Col md={6}>

                                                    <div className='panel'>
                                                        <div className='panel-heading oneLine'>
                                                            <h3 className='panel-title'>
                                                                Dados da Entrega
                                                                </h3>
                                                        </div>
                                                        <div className='panel-body'>
                                                            <div>Destinatário: <b>{venda.comprador.first_name_comprador} {venda.comprador.last_name_comprador}</b></div>
                                                            <Typography variant="body2">
                                                                CEP: <b>{venda.dados_entrega.endereco_entrega.cep}</b>
                                                            </Typography>
                                                            <div>Telefone da pessoa responsável pelo recebimento: <b>{venda.dados_entrega.endereco_entrega.telefonePessoaEntrega}</b></div>
                                                            <div>Nome da pessoa responsável pelo recebimento: <b>{venda.dados_entrega.endereco_entrega.nomePessoaEntrega}</b></div>
                                                            <div>Endereço: <b>{venda.dados_entrega.endereco_entrega.rua}</b> - Nº <b>{venda.dados_entrega.endereco_entrega.numero}</b></div>
                                                            <div>Bairro: <b>{venda.dados_entrega.endereco_entrega.bairro.name}</b></div>
                                                            <div>Cidade: <b>{venda.dados_entrega.endereco_entrega.cidade.name}</b> - Estado: <b>{venda.dados_entrega.endereco_entrega.estado.name}</b></div>
                                                        </div>
                                                    </div>

                                                </Col>



                                                <Col md={6}>

                                                    <div className='panel' style={{ 'height': '193px' }}>
                                                        <div className='panel-heading oneLine'>
                                                            <h3 className='panel-title'>
                                                                Detalhes do Envio
                                                                </h3>
                                                        </div>
                                                        <div className='panel-body'>
                                                            <Typography variant="body2">
                                                                Código de Rastreio: {venda.dados_entrega.cod_rastreamento}
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                Método de envio: <b>{venda.dados_entrega.metodo_envio}</b>
                                                            </Typography>
                                                            <CardActions>
                                                                <Button
                                                                    variant="contained"
                                                                    color="default"
                                                                    startIcon={<RoomIcon />}>
                                                                    Ver endereço no Google Maps
                                                                 </Button>
                                                                <Tooltip title="Acompanhar o rastreamento do produto">
                                                                    <Button
                                                                        variant="contained"
                                                                        color="default"
                                                                        startIcon={<LocalShippingIcon />}>
                                                                        Visualizar rastreamento
                                                                    </Button>
                                                                </Tooltip>
                                                            </CardActions>



                                                        </div>
                                                    </div>

                                                </Col>
                                            </Row>
                                        </>
                                    }>
                                </Panel>
                            </Paper>
                        )
                    }
                })}
            </div>
        )
    }
}