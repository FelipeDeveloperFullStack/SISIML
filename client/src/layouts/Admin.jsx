import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Route, Switch } from "react-router-dom";
import NavbarController from "../modules/components/Navbars/NavbarController";
import Sidebar from "../modules/components/Sidebar/Sidebar";
import SidebarRight from "../modules/components/Sidebar/SidebarRight";
import { makeStyles } from '@material-ui/core/styles';
import routes from "routes.js";
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import '../../node_modules/react-chat-widget/lib/styles.css';
import CallApiAnuncio from '../modules/actions/CallApi/CallApiAnuncio'
import CallApiClient from '../modules/actions/CallApi/CallApiClient'
import CallApiVenda from '../modules/actions/CallApi/CallApiVenda'
import CallApiPerguntas from '../modules/actions/CallApi/CallApiPerguntas'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
import { DOMAIN, GET_PERGUNTAS, GET_QTDE_PERGUNTAS } from '../../src/modules/constants/constants'
import swal from 'sweetalert'

export default function Admin(props) {

  const [itemID, setItemID] = useState('')
  const [ClientID, setClientID] = useState(0)
  const [contBadge, setContBadge] = useState(0)
  const dispatch = useDispatch()

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    setContBadge(0)
    //Enviar para o Mercado livre
  }

  const setUserId = async () => {
    await axios.get(`${DOMAIN}/usuario/procurar_usuario_byEmail/${localStorage.getItem('@sigiml/email-usuario')}`).then(resp => {
        resp.data.map(user => {
            localStorage.setItem('@sigiml/id', user.id)
        })
    }).catch(error => { swal('Error', 'Houve um erro ao tentar procurar o usuario pelo e-mail \n' + error, 'error') })
}


  useEffect(() => {
    setUserId()
    let socket = socketIOClient(DOMAIN)
    socket.on('notification-ml', (perguntas) => {
      if (perguntas.status === 'UNANSWERED') {
        console.log(perguntas)
        setContBadge(1)
        setClientID(perguntas.from.id)
        setItemID(' - ' + perguntas.item_id)
        addResponseMessage(perguntas.text)
        axios.get(`${DOMAIN}/perguntas/fila_perguntas`).then(questions => {
          dispatch({ type: GET_PERGUNTAS, question: questions.data })
          dispatch({ type: GET_QTDE_PERGUNTAS, qtdePerguntas: questions.data.length })
        }).catch(error => console.log(error))
      }
    })
  }, [])

  const useStyles = makeStyles(theme => (
    {
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },

      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
      },

      root: {
        display: 'flex',
      },

      speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
      }
    }
  ))

  const classes = useStyles();

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getPathName = path => {
    for (let i = 0; i < routes.length; i++) {
      if (props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "";
  };


  return (
    <>
      <CallApiAnuncio />
      <CallApiClient />
      <CallApiVenda />
      <CallApiPerguntas />

      <div className={classes.root}>
        <NavbarController
          {...props}
          ref={React.createRef()}
          brandText={getPathName(props.location.pathname)}
        />

        <Sidebar {...props} routes={routes} ref={React.createRef()} />
      
        <main className={classes.content} >

          <div className={classes.toolbar} />

          <div>
            <label style={{ color: '#818281', fontSize: '18px' }}>{getPathName(props.location.pathname) === 'Chat' ? 'Perguntas' : getPathName(props.location.pathname)}</label>
          </div>

          <Switch>{getRoutes(routes)}</Switch>


          <div className="App">
            <Widget
              title="Perguntas"
              subtitle={new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + "\n" + itemID}
              badge={contBadge}
              handleNewUserMessage={handleNewUserMessage}
              senderPlaceHolder='Digite uma resposta'
              showCloseButton={true} />
          </div>

          {/**<div>
          <Launcher
            agentProfile={{
              teamName: 'react-chat-window',
              imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
            }}
            onMessageWasSent={_onMessageWasSent}
            messageList={message.messageList}
            sendMessage={_sendMessage}
            showEmoji
          />
        </div> */}

        </main>

        

      </div>
      <SidebarRight/>
    </>
  );

}

