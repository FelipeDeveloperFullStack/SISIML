import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import codeSecurityAccess from '../../../assets/img/code_security_access.jpg'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import axios from 'axios'
import sendNotification from '../../components/Notification/Notification'
import { DOMAIN, SET_USER, ACTIVE_STEP } from '../../constants/constants'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Redirect } from 'react-router-dom'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

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

    const [code, setCode] = React.useState('')
    const [redirectLogin, setRedirectLogin] = React.useState(false)
    const [loadingButton, setLoadingButton] = React.useState(false)
    const [redirectNewPassword, setRedirectNewPassword] = React.useState(false)
    const dispatch = useDispatch()
    const forgotPasswordActiveStepState = useSelector(store => store.forgotPassword.activeStep)
    const steps = useSelector(store => store.forgotPassword.steps)
    const [disabledButton, setDisabledButton] = React.useState(false)

    const findCodeSecurity = async (code) => {
        if (code === '') {
            sendNotification("error", 'O código de segurança é obrigatório! Tente novamente.', 5000)
            return
        }
        setLoadingButton(true)
        setDisabledButton(true)
        await axios.post(`${DOMAIN}/usuario/post/usuario/procurarCodigoSeguranca`, { code }).then(response => {
            if (response.data.length === 0) {
                sendNotification("error", "Código de segurança inválido! Verifique sua caixa de entrada e tente novamente.", 5000)
                setLoadingButton(false)
                setDisabledButton(false)
            } else {
                setDisabledButton(false)
                setLoadingButton(false)
                setRedirectNewPassword(true)
                dispatch({
                    type: SET_USER,
                    user: {
                        id: response.data[0].id,
                        cpf: response.data[0].cpf
                    }
                })
                dispatch({type: ACTIVE_STEP, activeStep: 2})
                
            }
        }).catch(err => sendNotification('error', 'Houve um erro ao tentar enviar o email de redefinição de senha! Entre em contato com o suporte técnico!', 5000))
    }

    return (
        <>
            <div style={container}>
                <div>
                    <img style={{ width: '227px' }} src={codeSecurityAccess} />
                </div>
                <div style={boxRight}>
                    <div style={boxRightText01}>Código de segurança</div>
                    <div>Digite abaixo o código de segurança que enviamos para o seu e-mail.</div>
                    <TextField value={code} onChange={(e) => setCode(e.target.value)} style={boxRightEmail} label='Codígo de segurança' />
                    <div style={{ display: 'flex' }}>
                        <Button disabled={disabledButton} size='small' onClick={() => findCodeSecurity(code)} startIcon={<LockOpenIcon />} style={boxRightButton} variant="contained" color="primary">{loadingButton ? <>Um momento aguarde...</> : <>Confirmar código de segurança</>}</Button>
                        <Button size='small' onClick={() => setRedirectLogin(true)} startIcon={<ArrowBackIosIcon />} style={{ marginLeft: '10px', marginTop: '35px' }} variant="contained" color="secondary">Voltar</Button>
                    </div>
                </div>
            </div>
            <Stepper style={{ margin: '-195px 300px 200px' }} activeStep={forgotPasswordActiveStepState}>
                {steps.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {redirectLogin && <Redirect to='/' />}
            {redirectNewPassword && <Redirect to='/new_password' />}

        </>
    )
}