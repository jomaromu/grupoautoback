const express = require('express');
const nodemailer = require("nodemailer");
const bodyParse = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
// const {
//     google
// } = require('googleapis');

const app = express();
app.use(cors());

app.use(bodyParse.urlencoded({
    extended: true
}));
app.use(bodyParse.json());

app.use(fileUpload());

app.get('/correo', (req, resp, next) => {
    resp.status(200).json({
        ok: true,
    });
});

app.post('/envio', async(req, resp, next) => {


    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jroserodevpa@gmail.com',
            pass: '12345678Mm&',
        }
    });

    const mailOptions = {
        from: `jroserodev <jroserodevpa@gmail.com>`,
        to: 'jomaromu2@gmail.com',
        subject: `Consulta desde grupoautopana.com`,
        text: 'algo',
        html: `<h3>Prueba</h3>`
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });

    // google
    // const CLIENT_ID = '537728391366-qj1jvaho39hftbkbohhtqu1t86r4def7.apps.googleusercontent.com';
    // const CLIENT_SECRET = 'KwJzcA_aKtDLfbnGJ9Wkm4iz';
    // const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    // const REFRESH_TOKEN = '1//04K5JI5DjfDz0CgYIARAAGAQSNwF-L9IrY9ap05Wj_1ySTYBW6W6UbHtT_6Cf_8HEWMnDnIdijqmwULWl94rVMLbZ4IVN7cUUu3o';
    // const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    // oAuth2Client.setCredentials({
    //     refresh_token: REFRESH_TOKEN
    // });

    // const sendMail = async() => {


    //     try {
    //         const accessToken = await oAuth2Client.getAccessToken();
    //         const transport = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 type: 'OAuth2',
    //                 user: 'jroserodevpa@gmail.com',
    //                 clientId: CLIENT_ID,
    //                 clientSecret: CLIENT_SECRET,
    //                 refreshToken: REFRESH_TOKEN,
    //                 accessToken: accessToken,
    //             }
    //         });

    //         const mailOptions = {
    //             from: `${req.body.nombre} <${req.body.correo}>`,
    //             to: 'jomaromu2@gmail.com',
    //             subject: `Consulta desde grupoautopana.com`,
    //             text: 'algo',
    //             html: `<h3>${req.body.mensaje}</h3>`
    //         }

    //         const result = await transport.sendMail(mailOptions);
    //         return result;

    //     } catch (error) {
    //         return error;
    //     }
    // }

    // sendMail().then((resp) => {
    //     return resp.status(200).json({
    //         ok: true,
    //         mensaje: resp
    //     });
    // }).catch((error) => {
    //     return resp.status(500).json({
    //         ok: false,
    //         mensaje: error
    //     });
    // });
});

module.exports = app;