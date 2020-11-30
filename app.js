const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const key = fs.readFileSync(__dirname + '/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/selfsigned.crt');

const opcionSsl = {
    key: key,
    cert: cert
}

// iniciar express
const app = express();

// usar cors
app.use(cors());

// ruta del procesamiento de los correos
const correo = require('./correo');

// uso de la ruta
app.use('/', correo);

const server = https.createServer(opcionSsl, app);

server.listen(3000, () => {
    console.log('Escuchando el el puerto 3000');
});