//const MercadoLibreStrategy = require('passport-mercadolibre').Strategy;
const MercadoLibreStrategy = require('./mercado-livre').Strategy
const keys = require('./keys');
const usuarioService = require("../services/usuario-service");


module.exports = (passport, io) => {

  passport.use(new MercadoLibreStrategy({

    clientID: keys.mercadolivre.CLIENT_ID,
    clientSecret: keys.mercadolivre.CLIENT_SECRET,
    callbackURL: keys.mercadolivre.CALLBACK_URL,

  }, (accessToken, refreshToken, profile, done) => {

    usuarioService.buscarUsuarioPorNumberDocumento(profile, accessToken, refreshToken)


    usuarioService.salvarUsuario(setUsuario(profile, accessToken, refreshToken))

    return done(null, profile);

  }
  ));

  const setUsuario = (profile, accessToken, refreshToken) => {
    return usuario = {
      id: profile.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
      nickname: profile.nickname,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email
    }
  }

  passport.serializeUser((profile, done) => {
    done(null, profile);
  });

  passport.deserializeUser((profile, done) => {
    done(null, profile);
  });

}
