import React, {useState} from 'react'
import { Button, Modal, Header, Icon, Table } from 'semantic-ui-react'
import EditarVariacao from './EditarVariacao'

export default function GerenciarVariacoes(props){

    const [isShowEditarAnuncio, setIsShowEditarAnuncio] = useState(false);
    const [variacao, setVariacao] = useState({})
    const [attributeCombinations, setAttributeCombinations] = useState({})

    const setProps = (variacao, attr) => {
      setIsShowEditarAnuncio(true)
      setVariacao(variacao)
      setAttributeCombinations(attr)
    }

    return(
        <Modal style={{
            'position': 'relative',
            'width': '100%',
            'marginBottom': '5%',
            'marginLeft': '50%',
            'marginRight': '50%'
          }}
            trigger={
              <a>Gerenciar Variações</a>
            } >

            <Header icon='edit' content='Gerenciar Variações'
              style={{ 'backgroundColor': '#467EED', 'color': 'white' }} />

            <Modal.Content>
              <p>
                {props.titulo}
              </p>

              <Table basic>
                   <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Variação</Table.HeaderCell>
                        <Table.HeaderCell>Estoque</Table.HeaderCell>
                        <Table.HeaderCell>Qtde vendido</Table.HeaderCell>
                        <Table.HeaderCell>Ações</Table.HeaderCell>
                      </Table.Row>
                   </Table.Header> 

                   <Table.Body>
                     {props.json.variations.map(variation => {
                       return(
                        <Table.Row key={variation.id}>
                          {variation.attribute_combinations.map(attr => {
                            if(attr.id === 'SIZE' || attr.id === null){
                              return (
                                <>
                                <Table.Cell>{attr.value_name}</Table.Cell>
                                <Table.Cell>{variation.available_quantity}</Table.Cell>
                                <Table.Cell>{variation.sold_quantity}</Table.Cell>
                                <Table.Cell>
                                  <Button icon color='red' style={{ 'fontSize': '12px'}}> <Icon name='remove' /> </Button>
                                  <Button icon color='blue' style={{'fontSize': '12px'}} onClick={() => setProps(variation, attr)}> <Icon name='edit' /> </Button>
                                </Table.Cell>
                                <EditarVariacao 
                                  variacao={variacao}
                                  attributeCombinations={attributeCombinations}
                                  isShowEditarAnuncio={isShowEditarAnuncio} 
                                  setIsShowEditarAnuncio={setIsShowEditarAnuncio}/>
                                </>
                              )
                            }
                          })}
                         
                        </Table.Row>
                       )
                     })}
                     
                   </Table.Body>
              </Table>
            </Modal.Content>

            <Modal.Actions>
            <Button color='green'>
                <Icon name='checkmark' /> Confirmar
            </Button>

              <Button color='red'>
                <Icon name='remove' /> Fechar
            </Button>
            </Modal.Actions>          
          </Modal>
    )
}