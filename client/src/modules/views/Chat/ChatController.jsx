import React from 'react'
import ChatView from './ChatView'
import {connect} from 'react-redux'
import {GET_PERGUNTAS, DOMAIN} from '../../constants/constants'
import axios from 'axios'
import swal from 'sweetalert'

class ChatController extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = () =>{
        this.mostrarPerguntas(this.props.perguntas)
    }

    mostrarPerguntas = async (perguntas) => {
        await this.props.listarPerguntas(perguntas)
    }

    responder = async (question_id, text) => {
        let userId = localStorage.getItem("@sigiml/id")
        await axios.post(`${DOMAIN}/notifications/responder/${userId}`, {question_id: question_id, text: text}).then(async response => {
            await this.mostrarPerguntas(this.props.perguntas)
            await this.atualizarStorePerguntas()
            swal('Respondido!', 'Pergunta respondida.', 'success')
        }).catch(error => console.log(error))
    }

    atualizarStorePerguntas = async () => {
        let userId = String(localStorage.getItem('@sigiml/id'))
        await axios.get(`${DOMAIN}/perguntas/fila_perguntas/${userId}`).then(async pergunta => {
            await this.mostrarPerguntas(pergunta.data)
        }).catch(error => {console.log(error)})
    }

    render() {
        return (
            <ChatView {...this.state} perguntas={this.props.perguntas} responder={this.responder}/>
        )
    }
}

const mapStateToProps = store => ({
    perguntas: store.perguntas.question
})

const mapDispatchToProps = dispatch => {
    return ({
        listarPerguntas: (perguntas) => {
            dispatch({type: GET_PERGUNTAS, question: perguntas})
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatController)

