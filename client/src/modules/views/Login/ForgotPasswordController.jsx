import React from 'react'
import ForgotPassword from './ForgotPassword'
import axios from 'axios'
import sendNotification from '../../components/Notification/Notification'
import { DOMAIN } from '../../constants/constants'
import { Redirect } from 'react-router-dom'

export default class ForgotPasswordController extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingButton: false,
            redirectToPageCodeSecurity: false
        }
    }

    sendEmail = async (emailToSend) => {
        if (emailToSend === '') {
            sendNotification('error', 'O email é obrigatório! Tente novamente', 5000)
            return
        }
         await axios.get(`${DOMAIN}/usuario/procurar_usuario_byEmail/${emailToSend}`).then(async response => {
            if (response.data.length === 0) {
                sendNotification('error', 'Não existe nenhum usuário cadastrado com esse e-mail! Tente novamente.', 5000)
            } else {
                this.setState({ loadingButton: true })
                await axios.post(`${DOMAIN}/forgot_password`, { emailToSend: emailToSend }).then(response => {
                    this.setState({ loadingButton: false, redirectToPageCodeSecurity: true })
                    sendNotification("success", 'E-mail enviado, por favor verifique sua caixa de entrada, se em alguns minutos não chegar nenhum e-mail na sua caixa de entrada, verifique nos spams', 20000)
                }).catch(err => sendNotification('error', 'Houve um erro ao tentar enviar o email de redefinição de senha! Entre em contato com o suporte técnico!', 5000))
            }
        }).catch(err => sendNotification('error', 'Houve um erro ao tentar buscar o usuário pelo email! Entre em contato com o suporte técnico!', 5000))
    }

    render() {
        if (this.state.redirectToPageCodeSecurity) {
            return (
                <Redirect to='/code_security' />
            )
        } else {
            return (
                <ForgotPassword sendEmail={this.sendEmail} {...this.state} />
            )
        }
    }
}