const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config.js')
const router = require('../network/routes.js');
const app = express();

app.use(bodyParser.json());



//rutas
app.use(router);


app.listen(config.api.port, ()=>{
    console.log('api escuchando en el puerto ', config.api.port)
});