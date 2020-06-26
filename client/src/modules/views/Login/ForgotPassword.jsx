import React from 'react'
import {useSelector} from 'react-redux'
import forgotpassword from '../../../assets/img/forgotpassword.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import EmailIcon from '@material-ui/icons/Email';
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

    const [email, setEmail] = React.useState('')
    const steps = useSelector(store => store.forgotPassword.steps)

    return (
        <>
            <div style={container}>
                <div>
                    <img src={forgotpassword} />
                </div>
                <div style={boxRight}>
                    <div style={boxRightText01}>Esqueceu sua senha?</div>
                    <div>Digite seu endereço de e-mail abaixo e enviaremos um link para redefinir sua senha.</div>
                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} style={boxRightEmail} label='E-mail' />
                    <Button onClick={() => props.sendEmail(email)} startIcon={<EmailIcon />} style={boxRightButton} variant="contained" color="primary">
                        {props.loadingButton ? <>Enviando e-mail, aguarde...</> : <>Enviar link de redefinição</>}
                    </Button>
                </div>
            </div>
                <Stepper style={{margin: '-195px 300px 200px'}} activeStep={0}>
                    {steps.map((label, index) => {
                         return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
        </>
    )
}