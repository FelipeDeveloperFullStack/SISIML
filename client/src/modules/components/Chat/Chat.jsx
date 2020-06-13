import React from 'react'
import { Input, Button } from 'semantic-ui-react'
import '../../../assets/css/Global/chat.css'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

/** Created by Felipe M Santos */

export default class Chat extends React.Component {

    render() {
        return (
            <div className='box box-primary direct-chat direct-chat-primary' style={{border: 'none'}}>
                <div className='box-header'>

                    <h3 className='box-title'>
                        {this.props.title}
                    </h3>

                    <div className='box-tools pull-right' style={{ 'display': this.props.displayButtonClose }}>
                        <button onClick={this.props.close} type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                    </div>

                </div>
                <div className='box-body' style={{height : this.props.height}}>
                    <div>
                        {this.props.pergunta !== null
                            ?
                            <div className='direct-chat-msg'>
                                <div className='direct-chat-info clearfix'>
                                    <span className="direct-chat-name pull-left"><b>{this.props.nomeCompletoCliente}</b></span>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <Avatar alt="" src="/" />
                                    <div style={{backgroundColor: '#435F7A', margin: '0px 10px', maxWidth: '800px', width: 'max-content', padding: '15px', borderRadius: '25px', color: 'white'}}>{this.props.pergunta}</div>
                                </div>    
                            </div>
                            : <></>
                        }
                        <span className="direct-chat-info clearfix direct-chat-name pull-left">{this.props.dataHoraPergunta}</span>

                        {this.props.resposta !== null
                            ? 
                            <div className='direct-chat-msg right'>
                                <div className="direct-chat-info clearfix">
                                    <span className="direct-chat-name pull-right"><b>{this.props.nomeEmpresa}</b></span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <div className="direct-chat-name pull-right" style={{backgroundColor: '#E6EAEA', margin: '0px 10px 10px', maxWidth: '800px', width: 'max-content', padding: '15px', borderRadius: '25px', color: 'black'}}>
                                        {this.props.resposta.replace("&lt;", '<').replace("&gt;", ">").replace("&lt;/a&gt;", "</a>")}
                                    </div>
                                    <Avatar alt="" src="/" />
                                </div>    
                            </div>
                            : <></>
                        }

                    </div>
                </div>
                <div className='box-footer' style={{ 'display': this.props.displayFooter }}>
                    <Input fluid type='text' placeholder='Digite a mensagem que deseja enviar...' action>
                        <input />
                        <Button type='submit'>Enviar resposta</Button>
                    </Input>
                </div>
            </div>
        )
    }
}