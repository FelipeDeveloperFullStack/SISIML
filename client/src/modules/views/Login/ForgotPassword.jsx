import React from 'react'
import forgotpassword from '../../../assets/img/forgotpassword.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import EmailIcon from '@material-ui/icons/Email';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

function getSteps() {
    return ['Passo 01 - Envio do link para redefinição da senha', 
            'Passo 02 - Confirmação do código de segurança', 
            'Passo 03 - Redefinição da senha'
           ];
  }
  

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

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

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
                        {props.loadingButton ? <>Enviando e-mail...</> : <>Enviar link de redefinição</>}
                    </Button>
                </div>
            </div>
                <Stepper style={{margin: '-195px 300px 200px'}} activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
        </>
    )
}