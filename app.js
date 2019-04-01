const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const configureRoutes = require('./api/routes');


// DEFINE QUE O RENDER DA APLICACAO VAI SER HTML
app.set('view engine', 'html');


// PARAMETROS PARA FAZER AUTOMATICAMENTE A CONVERSAO DO BODY
// DA REQUISICAO PARA UM JSON QUE O JAVASCRIPT POSSA USAR
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.io = io;
configureRoutes(app);





// INDEX FILE
app.use('/index', (req, res) => {
    res.sendFile(__dirname + '/app/views/index.html')
});


// INICIA A APLICACAO
http.listen(3000, function () {
    console.log('listening on *:3000');
});

// PRECISA EXPORTAR O MODULO DE APLICACAO PARA FAZER OS TESTES DE INTEGRACAO
module.exports = app;
