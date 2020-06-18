import React from 'react'
import MensagensAutomaticasView from './MensagensAutomaticasView'
import {DOMAIN} from '../../constants/constants'
import axios from 'axios'

class PerguntasController extends React.Component {

    constructor(props){
        super(props)
        document.title = "Mensagens automaticas"
        this.state = {
            mensagem: {}
        }
    }

    componentDidMount = async () => {
        let userId = localStorage.getItem("@sigiml/id")
        await axios.post(`${DOMAIN}/msg_pos_venda/find`, {userId}).then(response => {
            console.log(response.data[0])
            this.setState({mensagem: response.data[0]})
        })
    }

    render(){
        return(
            <MensagensAutomaticasView {...this.state}/>
        )
    }
}

export default PerguntasController