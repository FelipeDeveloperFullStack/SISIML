import React from 'react'
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import newPassword from '../../../assets/img/new_password_image.jpg'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import sendNotification from '../../components/Notification/Notification'
import Axios from 'axios'
import {DOMAIN} from '../../constants/constants'

export default function ForgotPassword(props) {

    const container = {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        margin: '45px 300px 200px',
        padding: '55px',
        boxShadow: '0px 0px 10px grey',
        borderRadius: '5px'
    }

    const boxRight = {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 15px 0px'
    }

    const boxRightText01 = {
        fontSize: '23px',
        fontWeight: 'bold',
        padding: '0px 0px 15px',
    }

    const boxRightEmail = {
        marginTop: '15px'
    }

    const boxRightButton = {
        marginTop: '35px'
    }

    const [senha, setSenha] = React.useState('')
    const [confirmeSenha, setConfirmeSenha] = React.useState('')
    const stateForgotPassword = useSelector(store => store.forgotPassword)
    const [redirectLogin, setRedirectLogin] = React.useState(false)

    const confirmPassword = async () => {
        if(senha !== confirmeSenha){
            sendNotification("error", 'Senhas diferentes, por favor informe a mesma senha nos dois campos de texto e tente novamente.', 5000)
            return
        }
        let id = stateForgotPassword.user.id
        await Axios.post(`${DOMAIN}/usuario/post/usuario/senha/atualizar_senha`, {id: id, password: senha}).then(response => {
            sendNotification("success", 'Nova senha atualizada com sucesso!', 5000)
            setRedirectLogin(true)
        }).catch(err => sendNotification("error", 'Houve um erro ao tentar confirmar a nova senha, por favor entre em contato com o suporte técnico!', 5000))
       
    }

    return (
        <>
            <div style={container}>
                <div>
                    <img style={{width: '227px'}} src={newPassword} />
                </div>
                <div style={boxRight}>
                    <div style={boxRightText01}>Digite a nova senha.</div>
                    <div>Digite abaixo a nova senha para acesso ao sistema.</div>
                    <TextField type="password" value={senha} onChange={(e) => setSenha(e.target.value)} style={boxRightEmail} label='Nova senha' />
                    <TextField type="password" value={confirmeSenha} onChange={(e) => setConfirmeSenha(e.target.value)} style={boxRightEmail} label='Confirme a nova senha' />
                    <Button onClick={confirmPassword} startIcon={<AssignmentTurnedInIcon/>} style={boxRightButton} variant="contained" color="primary">
                        {props.loadingButton ? <>Direcionando para a tela de login...</> : <>Confirmar nova senha</>}
                    </Button>
                </div>
            </div>
            {redirectLogin && <Redirect to='/'/>}
        </>
    )
}