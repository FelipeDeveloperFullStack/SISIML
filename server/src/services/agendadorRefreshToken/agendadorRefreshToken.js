const axios = require('axios')
const constants = require('../../constants/constants')

const agendadorRefreshToken = async() => {
    setInterval(async ()=> {
        await axios.get(`${constants.localhost.LOCALHOST_5000}/atualizador_refresh_token`).then(response => {
            console.log(`Atualizador refreshToken executado com sucesso!`)
        }).catch(err => console.log(err))
    }, 5000)
}

module.exports = agendadorRefreshToken
