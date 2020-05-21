import React from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'react-bootstrap'
import { Accordion, Icon } from 'semantic-ui-react'



export default function ClientView(props) {

    const [activeIndex, setActiveIndex] = React.useState(0)

    const handleClick = (event, titleProps) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        console.log(newIndex)
        setActiveIndex(newIndex)
    }

    return (
        <div>

            <div style={{ margin: '0 0 10px' }}>
                <TextField size='small' label="Buscar por nome" variant="outlined" style={{ width: '100%' }} />
            </div>

            {props.result.map((resp, key) => {
                if (!props.isLoading) {
                    return (
                        <>
                            <Paper elevation={3} style={{ padding: '15px 15px 15px' }}>
                                <Row key={key}>
                                    <Col md={3}>
                                        <div style={{ fontSize: '15px' }}>{resp.primeiro_nome} {resp.last_name}</div>
                                        <div style={{ fontSize: '10px', color: '#8191B6' }}>Última compra 5 dias atrás</div>
                                    </Col>
                                    <Col md={3}>
                                        <div style={{ fontSize: '13px' }}>{resp.nickname}</div>
                                    </Col>
                                    <Col md={2}>
                                        <div style={{ fontSize: '15px' }}>{resp.documento}</div>
                                        <div style={{ fontSize: '12px' }}>{resp.tipo_documento}</div>
                                    </Col>
                                    <Col md={2}>
                                        <div style={{ fontSize: '15px', color: 'blue' }}>{resp.quantidadeCompras}</div>
                                        <div style={{ fontSize: '12px', color: 'black' }}>Compras</div>
                                    </Col>
                                    <Col md={2}>
                                        <div style={{ fontSize: '15px', color: 'blue' }}>R$ {resp.totalCompras}</div>
                                        <div style={{ fontSize: '12px', color: 'black' }}>Valor total</div>
                                    </Col>
                                    <Accordion>
                                        <Accordion.Title
                                            active={activeIndex === resp.id}
                                            onClick={handleClick}
                                            index={resp.id}>
                                            <Icon name='dropdown' />
                                            Ver detalhes das compras realizadas
                                        </Accordion.Title>
                                        <Accordion.Content active={activeIndex === resp.id}>
                                            {console.log(resp.compras_cliente)}
                                            
                                        </Accordion.Content>
                                    </Accordion>
                                    <p />
                                </Row>
                            </Paper>
                            <p />
                        </>
                    )
                }
            }
            )}
        </div>
    )
}