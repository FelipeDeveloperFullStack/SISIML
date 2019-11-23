"use strict"

const express = require("express");
const passport = require("passport");
const router = express.Router();
const constants = require('../constants/constants');

/**
 * @author Felipe Miguel dos Santos
 */

router.get('/auth/mercadolibre', passport.authorize('mercadolibre'));

//Retorno de callback do servidor do mercado livre
router.get('/auth/mercadolibre/callback', passport.authorize('mercadolibre', { 
    failureRedirect: '/login' 
}), (req, res) => {
        // Redireciona para a página principal do sistema
        console.log("req.user - callback: " + req);
        console.log("Usuario logado - callback: " + req);

        res.redirect(constants.localhost.LOCALHOST_3000+"/admin/dashboard");
    });

router.get('/', ensureAuthenticated, async (req, res) => {
       console.log("Usuario logado: " + req.user.nickname)
       await res.send("Usuario logado: " + req.user.nickname);
    }
);

/** Verifica se o usuário já está autenticado, caso sim, redireciona para a página principal do sistema
  Se não, rediciona para a rota /auth/mercadolibre **/
function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    };
    res.redirect('/auth/mercadolibre');
};


module.exports = router;
