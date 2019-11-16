'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const index = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const anuncioRoute = require('./routes/anuncio.route');
const mercadoLivreRoute = require('./routes/mercadoLivre-route');
const app = express();
require('../config/passport-mercadolivre');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

//app.use('/', index);

app.use('/products', productRoute);

//Anúncio
app.use('/anuncio', anuncioRoute);

//Mercado Livre
app.use('/', mercadoLivreRoute);

module.exports = app;
