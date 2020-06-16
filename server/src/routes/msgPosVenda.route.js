const express = require('express')
const router = express.Router()
const msgPosVenda = require('../services/msgPosVenda-service')


router.post('/', msgPosVenda.salvarBd)

module.exports = router