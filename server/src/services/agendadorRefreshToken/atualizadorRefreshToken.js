const keys = require('../../config/keys')
const axios = require('axios')
const Usuario = require('../../models/usuario-model')
const CONSTANTS = require('../../constants/constants')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    await axios.get(`${CONSTANTS.localhost.LOCALHOST_5000}/usuario/get_all/users`).then(async user => {
        user.data.map(async response => {
            await axios.post(`https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=${keys.mercadolivre.CLIENT_ID}&client_secret=${keys.mercadolivre.CLIENT_SECRET}&refresh_token=${response.refreshToken}`).then(resp => {
                Usuario.findByIdAndUpdate(
                    {_id: response._id}, 
                    {$set: {accessToken: resp.data.access_token}}
                ).then(response => {
                    console.log(response)
                    res.send(response)
                }).catch(error => console.log(error))
            }).catch(error => console.log(error))
        })
    }).catch(error => console.log(error))
}) 

module.exports = router