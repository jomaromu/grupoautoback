const express = require('express');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// iniciar express
const app = express();

// ruta del procesamiento de los correos
const correo = require('./correo');

// uso de la ruta
app.use('/', correo);

app.listen(3000, () => {
    console.log('Escuchando el el puerto 3000');
});