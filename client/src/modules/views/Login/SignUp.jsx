import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import swalert from 'sweetalert'
import { NavLink } from 'react-router-dom';
import { cpf } from 'cpf-cnpj-validator';
import emailValidator from 'email-validator'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Felipe M. Santos {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {




  const classes = useStyles();

  const [nome, setNome] = useState()
  const [sobrenome, setSobrenome] = useState()
  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()
  const [confirmeSenha, setConfirmeSenha] = useState()
  const [documento, setDocumento] = useState()

  const handleUsuario = () => {
    let usuario = {
      nome,
      sobrenome,
      email,
      password: senha,
      cpf: documento
    }
    if (usuario.nome === undefined) {
      swalert('Atenção', 'O nome é obrigatório! \n\n Tente novamente.', 'warning')
      return
    }

    if (usuario.sobrenome === undefined) {
      swalert('Atenção', 'O sobrenome é obrigatório! \n\n Tente novamente.', 'warning')
      return
    }

    if (usuario.email === undefined) {
      swalert('Atenção', 'O e-mail é obrigatório! \n\n Tente novamente.', 'warning')
      return
    }

    if (usuario.cpf === undefined) {
      swalert('Atenção', 'O CPF/CNPJ é obrigatório! \n\n Tente novamente.', 'warning')
      return
    }

    if (usuario.password === undefined) {
      swalert('Atenção', 'A senha de acesso é obrigatório! \n\n Tente novamente.', 'warning')
      return
    }

    if(confirmeSenha !== usuario.password){
      swalert('Atenção', 'A senha que você informou é diferente da senha de confirmação, por segurança, você precisa informar a mesma senha nos dois campos! \n\n Tente novamente.', 'warning')
      return
    }

    //https://www.npmjs.com/package/cpf-cnpj-validator
    if(!cpf.isValid(usuario.cpf)){
      swalert('Atenção', 'CPF inválido \n\n Tente novamente.', 'warning')
      return
    }

    //https://www.npmjs.com/package/email-validator
    if(!emailValidator.validate(usuario.email)){
      swalert('Atenção', 'E-mail inválido! \n\n Tente novamente.', 'warning')
      return
    }

    props.salvarUsuario(usuario)

    setNome('')
    setSobrenome('')
    setEmail('')
    setSenha('')
    setDocumento('')
    setConfirmeSenha('')

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Informe os seus dados e crie sua senha
        </Typography>

        <Grid container spacing={2}>

          <Grid item xs={12} style={{ margin: '15px 0 0' }}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="Nome"
              autoFocus
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Sobrenome"
              name="lastName"
              autoComplete="lname"
              value={sobrenome}
              onChange={(event) => setSobrenome(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>

          <Tooltip title="Informe o mesmo CNPJ ou CPF que está cadastrado na sua conta do Mercado Livre.">
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="CPF/CNPJ"
                name="documento"
                value={documento}
                onChange={(event) => setDocumento(event.target.value)}
              />
            </Grid>
          </Tooltip>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Confirme a senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={confirmeSenha}
              onChange={(event) => setConfirmeSenha(event.target.value)}
            />
          </Grid>

        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => handleUsuario()}
        >
          Criar acesso
          </Button>
        <Grid container justify="flex-end">
          <Grid item>
            {'Já tem conta?'}{' '}
            <NavLink to='/'>
              Iniciar sessão
              </NavLink>
          </Grid>
        </Grid>

      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}