const express = require('express')
const router = express.Router()
const vendasService = require('../services/vendas-service')


router.get('/total-vendas', vendasService.obterTotalDeVendas)
router.get('/todas_vendas', vendasService.obterVendas)
router.get('/vendas-pendentes', vendasService.obterVendasPendentes)



module.exports = router