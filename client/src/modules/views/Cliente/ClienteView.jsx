import React from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'react-bootstrap'
import { Accordion, Icon } from 'semantic-ui-react'
import productIcon48px from '../../../assets/img/product-icon48px.png'
import Tooltip from '@material-ui/core/Tooltip'



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
                                        <div style={{ fontSize: '15px' }}><b>{resp.primeiro_nome} {resp.last_name}</b></div>
                                        <div style={{ fontSize: '10px', color: '#8191B6' }}>Última compra 5 dias atrás</div>
                                    </Col>
                                    <Col md={3}>
                                        <div style={{ fontSize: '13px' }}><b>{resp.nickname}</b></div>
                                        <div style={{ fontSize: '12px' }}>Nickname(Usuario)</div>
                                    </Col>
                                    <Col md={2}>
                                        <div style={{ fontSize: '15px' }}><b>{resp.documento}</b></div>
                                        <div style={{ fontSize: '12px' }}>{resp.tipo_documento}</div>
                                    </Col>
                                    <Col md={2}>
                                        <div style={{ fontSize: '15px', color: 'blue' }}><b>{resp.quantidadeCompras}</b></div>
                                        <div style={{ fontSize: '12px', color: 'black' }}>Compras</div>
                                    </Col>
                                    <Col md={2}>
                                        <div style={{ fontSize: '15px', color: 'blue' }}><b>R$ {resp.totalCompras}</b></div>
                                        <div style={{ fontSize: '12px', color: 'black' }}>Valor total</div>
                                    </Col>

                                    <Accordion>
                                        <Tooltip title="Clique para ver os detalhes das compras realizadas pelo cliente!">
                                            <Accordion.Title
                                                active={activeIndex === resp.id}
                                                onClick={handleClick}
                                                index={resp.id}>
                                                <Icon name='dropdown' />
                                                Ver detalhes das compras realizadas
                                            </Accordion.Title>
                                        </Tooltip>
                                        <Accordion.Content active={activeIndex === resp.id}>
                                            {resp.compras_cliente !== undefined ? resp.compras_cliente.map(compras => {
                                                return (
                                                    <>
                                                        <Paper elevation={1} style={{ margin: '0px 20px 0px' }}>
                                                            <Row style={{ paddingTop: '5px' }}>
                                                                <Col md={1} style={{ paddingLeft: '35px' }}>
                                                                    <img src={productIcon48px} />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <div style={{ fontSize: '15px' }}><b>{compras.item.title}</b></div>
                                                                    {compras.item.variation_attributes.map(att => {
                                                                        return (
                                                                            <>
                                                                                <div style={{ fontSize: '12px' }}><b>{att.name}</b>: {att.value_name}</div>
                                                                            </>
                                                                        )
                                                                    })}
                                                                    <div style={{ fontSize: '12px' }}><b>Anúncio:</b> #{compras.item.id}</div>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <div style={{ fontSize: '15px', color: 'blue' }}><b>R$ {compras.unit_price.toFixed(2)}</b></div>
                                                                    <div><b>{compras.quantity}</b> unidade</div>
                                                                    <div style={{ fontSize: '10px', color: '#8191B6' }}>5 dias atrás (Segunda feira 30/dez 2019)</div>
                                                                </Col>
                                                            </Row>
                                                        </Paper>
                                                        <p></p>
                                                    </>
                                                )
                                            }) : <></>}

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