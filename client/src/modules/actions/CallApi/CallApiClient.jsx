import React, { useEffect } from "react";
import axios from 'axios'
import { LISTAR_TODOS_CLIENTES, CARREGAR_DADOS_COMPRAS_POR_CLIENTE } from '../../constants/constants'
import { useDispatch } from 'react-redux'
import { DOMAIN } from '../../constants/constants'

/**
 * Criador por: @author Felipe M. Santos
 */

export default function CallApiClient(prosp) {

    const dispatch = useDispatch()

    useEffect(() => {
        let userId = String(localStorage.getItem('@sigiml/id'))
        axios.get(`${DOMAIN}/clientes/${userId}`).then(resp => {
            dispatch({ type: LISTAR_TODOS_CLIENTES, data: resp.data, isLoading: false })
        }).catch(err => console.log("ERROR", err))
    }, [])

    return (<></>)
}