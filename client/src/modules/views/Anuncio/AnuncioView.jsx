import React, { useState } from "react";
import { Grid, Row, Col, Navbar, Form, FormControl } from "react-bootstrap";
import Card from "modules/components/Card/Card.jsx";
import ButtonB from "modules/components/CustomButton/CustomButton.jsx";
import LoadingCarregandoSolicitacao from "modules/components/Loading/LoadingCarregandoSolicitacao"
import iconSearch from '../../../assets/img/Zoom-icon24px.png'
import '../../../assets/css/Global/style.css';
import Modal from '../../components/CustomModal/CustomModal'
import { Button, Dropdown } from 'semantic-ui-react'

export default function AnuncioView(props) {
  document.title = "Anúncios"

  const [showModal, setShowModal] = useState(false)
  const [anuncio, setAnuncio] = useState({})
  const [isActive, setIsActive] = useState('active')
  const [isSelectedEstadoProduto, setIsSelectedEstadoProduto] = useState('novo')
  const [isSelectedFrete, setIsSelectedFrete] = useState(props.freteGratis)

  const handleChangeIsActive = (e) => {
    setIsActive(e.target.value)
  };

  const handleChangeIsSelectedEstadoProdutoNovo = () => {
    setIsSelectedEstadoProduto('novo')
  }
  const handleChangeIsSelectedEstadoProdutoUsado = () => {
    setIsSelectedEstadoProduto('usado')
  }

  function handleChangeSelectedFreteGratis() {
    setIsSelectedFrete(props.freteGratis)
  }

  function handleChangeSelectedFretePorContaDoComprador() {
    setIsSelectedFrete('')
  }

  const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
  ]

  if (!props.isLoading) {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={props.title}
                category="Anúncios Ativos"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <Navbar bg="light" expand="lg">
                      <Form inline>
                        <FormControl type="text" placeholder="Buscar por título" className="mr-sm-2" style={{ 'width': '500px' }} />
                        <ButtonB bsStyle="primary" fill style={{ 'marginTop': "5px" }}><img src={iconSearch} alt='search'></img></ButtonB>
                      </Form>
                      <div className="col-sm-12" style={{ "marginLeft": '-15px', 'width': '150px' }}>
                        <FormControl componentClass="select" onChange={handleChangeIsActive}>
                          <option value="active">Ativos</option>
                          <option value="paused">Inativos</option>
                        </FormControl>
                        <br></br>
                      </div>

                    </Navbar>

                    {props.result.map(prop => {
                      if (prop.status === isActive) {
                        return (
                          <div className="panel panel-primary">
                            <div className="panel-heading">
                              <h3 className="panel-title">
                                {prop.titulo}
                              </h3>
                            </div>
                            <div className="panel-body" style={{ "minHeight": "142px" }}>
                              <div className="col-md-2 col-xs-12 text-center">
                                <img src={prop.foto_principal} alt='fotoPrincipal' height='100' width='80' />
                              </div>
                              <div className="col-md-5 col-xs-12 text-center-xs">
                                <font size="4pt">
                                  <a href={prop.link_anuncio} rel="noopener noreferrer" target='_blank'>{prop.titulo}</a>
                                </font>
                                <p>
                                  <i className="fa fa-tag text-primary"></i>
                                  <i className="fa fa-star text-primary"></i>
                                  <i className="fa fa-shopping-cart text-primary"></i>
                                  <a style={{ "fontSize": "14px", "marginLeft": "5px" }} rel="noopener noreferrer" target='_blank' full_base="1">#{prop.id}</a>
                                  <span className="badge badge-primary" style={{ "fontSize": "12px", "marginLeft": "5px" }}>{prop.totalVariacoes} Variações</span>
                                </p>
                                <p style={{ "fontSize": "15px" }}>Mercado Envios {prop.freteGratis} - R$ {prop.custoFreteGratis.toLocaleString("pt-BR")} por envio</p>
                                <p>
                                  <span style={{ "fontSize": "12px" }} className="badge">{prop.quantidadeVendido} Vendidos</span>
                                  <span style={{ "fontSize": "12px" }} className="badge badge-success">{prop.visualizacao} visitas</span>
                                  <span style={{ "fontSize": "12px" }} className="badge badge-success">{prop.tipoAnuncio}</span>
                                  <span style={{ "fontSize": "12px" }} className="badge badge-danger" >{prop.sub_status}</span>
                                </p>
                              </div>
                              <div className="col-md-3 col-xs-6 text-center-xs">
                                <font size="3">
                                  <b>
                                    <a style={{ "color": "red" }}>
                                      R$ {prop.preco.toLocaleString("pt-BR")}{' '}
                                    </a>
                                  </b>
                                </font>
                                <font size="3">
                                  x {prop.estoque_total} disponíveis
                              </font>
                                <br />
                                <span className="text-danger" style={{ "fontSize": "12px" }}>Tarifa R$ {prop.tarifa.toLocaleString("pt-BR")}</span>
                                <br />
                                <span className="text-danger" style={{ "fontSize": "12px" }}>Custo Fixo R$ {prop.custoFreteGratis.toLocaleString("pt-BR")}</span>
                                <br />
                                <span className="badge badge-info" style={{ "fontSize": "12px" }}>Líquido R$ {prop.liquido.toLocaleString("pt-BR")}</span>
                              </div>
                              <div className="col-md-2 col-xs-6 text-center-xs">
                                <a className="btn btn-sm btn-flat btn-primary btn-rad" onClick={() => {
                                  setShowModal(true)
                                  setAnuncio(prop)
                                }}> Modificar
                                </a>

                                <Button.Group color='teal'>
                                  <Button>Save</Button>
                                  <Dropdown
                                    className='button icon'
                                    floating
                                    options={options}
                                    trigger={<React.Fragment />}
                                  />
                                </Button.Group>

                              </div>
                            </div>
                          </div>
                        )
                      }
                    }
                    )}
                  </>
                }
              />
            </Col>
          </Row>
        </Grid>

        { /*MODAL*/}
        {console.log(props.freteGratis)}
        {showModal &&
          <Modal
            {...anuncio}
            setShowModal={setShowModal}
            showModal={showModal}
            isSelectedEstadoProduto={isSelectedEstadoProduto}
            handleChangeIsSelectedEstadoProdutoNovo={handleChangeIsSelectedEstadoProdutoNovo}
            handleChangeIsSelectedEstadoProdutoUsado={handleChangeIsSelectedEstadoProdutoUsado}
            isSelectedFrete={isSelectedFrete}
            handleChangeSelectedFreteGratis={handleChangeSelectedFreteGratis}
            handleChangeSelectedFretePorContaDoComprador={handleChangeSelectedFretePorContaDoComprador}
            freteGratis={props.freteGratis} />}

      </div>
    );
  } else {
    return (
      <>
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title={props.title}
                  category="Anúncios Ativos"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <LoadingCarregandoSolicitacao width={450} />
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>



      </>
    )
  }
}


