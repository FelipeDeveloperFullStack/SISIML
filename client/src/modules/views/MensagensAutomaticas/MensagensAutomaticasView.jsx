import React from 'react'
import '../../../assets/css/Global/chat.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import InfoIcon from '@material-ui/icons/Info';


export default class PerguntasView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isHabilitarEnvioCompraRealizada: false,
            mensagemCompraRealizada: '',
            isHabilitarEnvioProdutoEmTransito: false,
            mensagemProdutoEmTransito: '',
            isHabilitarEnvioProntoParaRetirarCorreios: false,
            mensagemProntoParaRetirarCorreios: '',
            isHabilitarEnvioProdutoEntregue: false,
            mensagemProdutoEntregue: '',
        }
    }

    componentDidMount = () => {
        console.log("\n")
        console.log(this.props.mensagem.mensagemCompraRealizada)
        console.log("\n")
        this.setState({
            isHabilitarEnvioCompraRealizada: Boolean(this.props.mensagem.isHabilitarEnvioCompraRealizada),
            mensagemCompraRealizada: String(this.props.mensagem.mensagemCompraRealizada),
            isHabilitarEnvioProdutoEmTransito: this.props.mensagem.isHabilitarEnvioProdutoEmTransito,
            mensagemProdutoEmTransito: this.props.mensagem.mensagemProdutoEmTransito,
            isHabilitarEnvioProntoParaRetirarCorreios: this.props.mensagem.isHabilitarEnvioProntoParaRetirarCorreios,
            mensagemProntoParaRetirarCorreios: this.props.mensagem.mensagemProntoParaRetirarCorreios,
            isHabilitarEnvioProdutoEntregue: this.props.mensagem.isHabilitarEnvioProdutoEntregue,
            mensagemProdutoEntregue: this.props.mensagem.mensagemProdutoEntregue,
        })
    }

    render() {
        return (
            <>
                <div style={{margin: '0 0 15px'}}>
                    <div style={{ borderLeft: '3px solid #179aa0', color: '#179aa0', backgroundColor: '#ebf8fa', padding: '10px 10px 10px', fontSize: '13px', display: 'grid', gridTemplateColumns: '30px auto' }}>
                        <InfoIcon /> <div style={{ margin: '2px 0 0' }}>Não inclua links de redes sociais nem URLs encurtadas nas suas mensagens, pois o Mercado Livre as bloqueará e elas não serão entregues.</div>
                    </div>

                    <div style={{ borderLeft: '3px solid #179aa0', color: '#179aa0', backgroundColor: '#ebf8fa', padding: '10px 10px 10px', fontSize: '13px', display: 'grid', gridTemplateColumns: '30px auto' }}>
                        <InfoIcon /> <div style={{ margin: '2px 0 0' }}>Utilize @NOME para chamar o comprador pelo seu nome e @COMPRADOR para utilizar seu apelido e @RASTREAMENTO para mostrar o código de rastreamento.</div>
                    </div>
                </div>

                <div>
                    <FormControlLabel
                        control={
                            <Checkbox checked={this.state.isHabilitarEnvioCompraRealizada} onChange={(event) => this.setState({isHabilitarEnvioCompraRealizada: event.target.checked})}/>
                        }
                        label="Enviar automaticamente uma mensagem ao comprador assim que realize a compra."
                    />
                </div>
                <div>
                    <TextField
                        multiline
                        rows="9"
                        placeholder="Olá @COMPRADOR, agradecemos a sua compra! Para continuar, por favor..."
                        variant="outlined"
                        value={this.props.mensagem.mensagemCompraRealizada}
                        style={{ width: '100%' }}
                    />
                </div>

                <div>
                    <FormControlLabel
                        control={
                            <Checkbox />
                        }
                        label="Enviar uma mensagem ao comprador quando o produto estiver em trânsito."
                    />
                </div>
                <div>
                    <TextField
                        multiline
                        rows="9"
                        placeholder="O seu pedido está em trânsito. @RASTREAMENTO"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                </div>

                <div>
                    <FormControlLabel
                        control={
                            <Checkbox />
                        }
                        label="Enviar automaticamente uma mensagem ao comprador quando o produto estiver pronto para ser retirado nos correios"
                    />
                </div>
                <div>
                    <TextField
                        multiline
                        rows="9"
                        placeholder="Seu pedido já está pronto para retirar nos correios. @RASTREAMENTO"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                </div>

                <div>
                    <FormControlLabel
                        control={
                            <Checkbox />
                        }
                        label="Enviar uma mensagem ao comprador quando o produto estiver sido entregue."
                    />
                </div>
                <div>
                    <TextField
                        multiline
                        rows="9"
                        placeholder="O produto que você comprou foi entregue! Muito obrigado!"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ padding: '15px 0 0' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                    >
                        Salvar alterações
                    </Button>
                </div>

            </>
        )
    }
}