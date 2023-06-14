const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const router = require('./network')
const app = express();

app.use(bodyParser.json());

//Rutas

app.use('/', router)

app.listen(config.postService.port, () => {
    console.log('Servicio de post escuchando en el puerto', config.mysqlService.port);
});
