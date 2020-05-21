const app = require('./app');
const http = require('http');
//const debug = require('debug')('nodestr: server');
const passport = require('passport')
const mongoose = require('mongoose');
const socketIO = require('socket.io')
const server = http.createServer(app);
const io = socketIO(server)
const notificacoesMercadoLivreRoute = require('./src/routes/notificacoes.mercadolivre.route')(io)
require('./src/config/passport.mercadolivre')(passport); //PASSPORT MERCADOLIVRE - INJETANDO O PASSPORT
const axios = require('axios')

mongoose.connect('mongodb+srv://admin:admin@cluster0-5qx8r.mongodb.net/sigiml?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

const port = process.env.PORT || 5000;

app.set('port', port);

app.set('io', io)
app.use('/notifications', notificacoesMercadoLivreRoute);

io.on('connection', socket => {
    console.log('Socket connected')

    socket.on('disconnected', () => {
        console.log('disconnected')
    })
})

server.listen(port, () => {
    console.log("\n");
    console.log(`Servidor rodando na porta: ${port}`);
    console.log("\n");
});


