const express = require('express')
const router = express.Router()
const vendasService = require('../services/vendas-service')


router.get('/getTotalDeVendas', vendasService.obterTotalDeVendas)
router.get('/getVendasConcluidas', vendasService.obterVendasConcluidas)
router.get('/getVendasPendentes', vendasService.obterVendasPendentes)
router.get('/getVendasEmTransito', vendasService.obterVendasEmTransito)
router.get('/getDadosEnvio/:shippingId', vendasService.obterDadosEnvio)



module.exports = router