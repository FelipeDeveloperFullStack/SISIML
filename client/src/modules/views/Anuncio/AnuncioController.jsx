import React, { useState } from 'react'
import AnuncioView from './AnuncioView';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { DOMAIN, LISTAR_TODOS_ANUNCIOS } from '../../constants/constants'
import sendNotification from '../../components/Notification/Notification'
import swal from 'sweetalert'

export default function AnuncioController() {

    const state = useSelector(store => store.anuncio)

    const [isShowEditPrice, setIsShowEditPrice] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)
    const [isStatusUpdated, setIsStatusUpdated] = useState(false)
    const [isShowConfirmPauseProduct, setIsShowConfirmPauseProduct] = useState(false)
    const [custoFrete, setCustoFrete] = useState(0)

    const dispatch = useDispatch()

    let updateTitle = async (itemId, title) => {
        await axios.put(`${DOMAIN}/anuncio/update_title`, {itemId, title}).then(response => {
            dispatch({type: LISTAR_TODOS_ANUNCIOS, data: updateStateTitleProduct(itemId, title), isLoading: false})
            sendNotification('success', 'Pronto, salvamos suas modificações!', 5000)
        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao atualizar o titulo do anuncio (AnuncioController:26)', 5000)
        })
    }

    let updateAnuncioPrice = async (itemId, price) => {
        if (price != '' || price != 0) {
            await axios.put(`${DOMAIN}/anuncio/update_price`, { itemId: itemId, price: price }).then(user => {

                setIsShowEditPrice(false)
                setLoadingButton(false)
                setDisabledButton(false)

                dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: updateStateStorePriceProduct(itemId, price), isLoading: false })

                //sendNotification('success', 'Preço do anúncio atualizado com sucesso!', 5000)
                swal("Atualizado!", "Preço do anúncio atualizado com sucesso", "success");

            }).catch(error => {
                sendNotification('error', 'Ocorreu um erro ao buscar o usuário pelo ID (AnuncioController:43)', 5000)
            })
        } else {
            //sendNotification('error', 'Preço inválido, informe um valor maior do que zero! Tente novamente', 5000)
            swal("Atenção", "Preço inválido, informe um valor maior do que zero! Tente novamente", "error");
            setIsShowEditPrice(false)
            setLoadingButton(false)
            setDisabledButton(false)
        }
    }

    //Function responsible for update product price
    let updateStateStorePriceProduct = (itemId, price) => {
        let temp = [] // The temp variable must be created because the map is returned undefined in another object
        state.result.map(product => {
            if (product.id === itemId) {
                product.preco = price
                product.tarifa = calcTarifa(price, product)
                product.liquido = calcValorLiquido(price, calcTarifa(price, product), product.custoFreteGratis)
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let updateStateTitleProduct = (itemId, title) => {
        let temp = [] // The temp variable must be created because the map is returned undefined in another object
        state.result.map(product => {
            if (product.id === itemId) {
                product.titulo = title
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let updateAvailableQuantity = (itemId, id, availableQuantity) => {
        sendNotification('success', 'Estoque do anúncio atualizado com sucesso!', 5000)
        sendNotification('success', 'ItemId: ' + itemId + ' ID: ' + id + ' AvailableQuantity: ' + availableQuantity)
    }

    let updateStatusAnuncioInStore = (itemId, status) => {
        let temp = []
        state.result.map(product => {
            if (product.id === itemId) {
                if (status === 'active') {
                    product.status = 'active'
                } else {
                    product.status = 'paused'
                }
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let updateListingTypeInStore = (itemId, listingType) => {
        let temp = []
        state.result.map(product => {
            if (product.id === itemId) {
                if (listingType === 'gold_special') {
                    product.tipoAnuncio = 'Clássico - Exposição alta'
                    product.tipoAnuncio_id = listingType
                } else {
                    product.tipoAnuncio = 'Premium - Exposição máxima'
                    product.tipoAnuncio_id = listingType
                }
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let calcTarifa = (price, anuncio) => {
        if (anuncio.tipoAnuncio_id === 'gold_special') {
            return price * (11 / 100)
        } else {
            return price * (16 / 100)
        }

    }

    let calcValorLiquido = (price, tarifa, custoFixo) => {
        return price - (tarifa + custoFixo)
    }

    let updateStatus = async (itemId, status) => {
        await axios.put(`${DOMAIN}/anuncio/update_status`, { itemId, status }).then(response => {

            setLoadingButton(false)
            setDisabledButton(false)
            setIsShowConfirmPauseProduct(false)
            setIsStatusUpdated(true)

            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: updateStatusAnuncioInStore(itemId, status), isLoading: false })

            //sendNotification('success', 'Status atualizado com sucesso!', 5000)
            swal("Atualizado!", "Status atualizado com sucesso", "success");

        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao atualizar o status do anúncio (AnuncioController:130)' + error)
        })
    }

    let updateListingType = async (itemId, listingType) => {
        await axios.post(`${DOMAIN}/anuncio/update_listing_type`, { id: listingType, itemId: itemId }).then(response => {
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: updateListingTypeInStore(itemId, listingType), isLoading: false })
            if (listingType === 'gold_special') {
                sendNotification('success', 'Pronto, salvamos suas modificações!', 10000)
            } else {
                sendNotification('success', 'Objetivo alcançado! Agora você pode oferecer parcelamento sem juros.', 10000)
            }

        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao atualizar o tipo de anúncio (AnuncioController:144)' + error)
        })
    }

    let obterValorDoCustoFreteGratisPorAnuncio = async (itemID) => {
        await axios.get(`${DOMAIN}/anuncio/obterValorDoCustoFreteGratisPorAnuncio/${itemID}`).then(response => {
            setCustoFrete(response.data.custo.toFixed(2))
        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao obter o custo do frete (AnuncioController:152)' + error)
        })
    }

    return (
        <>
            <AnuncioView
                state={state}
                {...state}
                updateTitle={updateTitle}
                custoFrete={custoFrete}
                updateAnuncioPrice={updateAnuncioPrice}
                isShowEditPrice={isShowEditPrice}
                setIsShowEditPrice={setIsShowEditPrice}
                loadingButton={loadingButton}
                setLoadingButton={setLoadingButton}
                disabledButton={disabledButton}
                setDisabledButton={setDisabledButton}
                isStatusUpdated={isStatusUpdated}
                setIsStatusUpdated={setIsStatusUpdated}
                updateStatus={updateStatus}
                isShowConfirmPauseProduct={isShowConfirmPauseProduct}
                setIsShowConfirmPauseProduct={setIsShowConfirmPauseProduct}
                updateAvailableQuantity={updateAvailableQuantity}
                updateListingType={updateListingType}
                obterValorDoCustoFreteGratisPorAnuncio={obterValorDoCustoFreteGratisPorAnuncio} />
        </>
    );
}