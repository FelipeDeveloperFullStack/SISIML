const express = require('express')
const router = express.Router()
const vendasService = require('../services/vendas-service')

router.get('/getTotalDeVendas/:userId', vendasService.obterTotalDeVendas)  //NÃO ESTÁ SENDO USADO - REVER
router.get('/getVendasConcluidas/get01/get02/:userId', vendasService.obterVendasConcluidas)
router.get('/getVendasPendentes/get01/get02/get03/:userId', vendasService.obterVendasPendentes)
router.get('/getVendasEmTransito/get01/get02/get03/get04/:userId', vendasService.obterVendasEmTransito)
router.get('/getVendasAEnviar/get01/get02/get03/get04/get05/:userId', vendasService.obterVendaProntoParaEnviar)

router.get('/getTotalVendas/get01/get02/get03/get04/get05/get06/:userId', vendasService.obterTotalVendas) //NÃO ESTÁ SENDO USADO - REVER
router.get('/getTotalVendasEmTransito/get01/get02/get03/get04/get05/get06/get07/:userId', vendasService.obterTotalVendasEmTransito)
router.get('/getTotalVendasAEnviar/get01/get02/get03/get04/get05/get06/get07/get08/:userId', vendasService.obterTotalVendasAEnviar)
router.get('/getTotalVendasPendentes/get01/get02/get03/get04/get05/get06/get07/get08/get09/:userId', vendasService.obterTotalVendasPendentes)

router.get('/gerarEtiquetaEnvio/:shipping_id', vendasService.gerarEtiquetaEnvio)

module.exports = router