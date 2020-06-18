import React from 'react'
import MensagensAutomaticasView from './MensagensAutomaticasView'
import socketIOClient from 'socket.io-client'
import {DOMAIN} from '../../constants/constants'

class PerguntasController extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            endPont: DOMAIN
        }

        document.title = "Mensagens automatica"
    }

    componentDidMount = () => {
        let socket = socketIOClient(this.state.endPont)
        socket.on('notification-ml', (perguntas) => {
            console.log(perguntas)
        })
    }

    render(){
        return(
            <MensagensAutomaticasView/>
        )
    }
}

export default PerguntasController