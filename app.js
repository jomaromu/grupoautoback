const express = require('express');
const cors = require('cors');
const fs = require('fs');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// iniciar express
const app = express();

// usar cors
app.use(cors());

// ruta del procesamiento de los correos
const correo = require('./correo');

// uso de la ruta
app.use('/', correo);

app.listen(3000, () => {
    console.log('Escuchando el el puerto 3000');
});