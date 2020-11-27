const express = require('express');
const nodemailer = require("nodemailer");
const bodyParse = require('body-parser');
const { google } = require('googleapis');

const app = express();
app.use(bodyParse.urlencoded({ extended: true }));

app.post('/', async(req, resp, next) => {

    // google
    const CLIENT_ID = '537728391366-qj1jvaho39hftbkbohhtqu1t86r4def7.apps.googleusercontent.com';
    const CLIENT_SECRET = 'KwJzcA_aKtDLfbnGJ9Wkm4iz';
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04JMWlnRMeaK1CgYIARAAGAQSNwF-L9IrlfGHmaVUMPSRPTYUIzqxYmrYowx5nBVtB8dZIlCGRitmsELmlxwX4K9lI30_psUtqu0';
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_ID, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const sendMail = async() => {

        const accessToken = await oAuth2Client.getAccessToken();

        try {
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'jroserodevpa@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken,
                }
            });

            const mailOptions = {
                from: 'jroserodevpa <jroserodevpa@gmail.com>',
                to: 'jomaromu2@gmail.com',
                subject: 'Prueba',
                text: 'Este es un texto de prueba',
                html: '<h6>Texto en html</h6>'
            }

            const result = await transport.sendMail(mailOptions);
            return result;

        } catch (error) {
            return error;
        }
    }

    sendMail().then((resp) => {
        console.log(resp);
    }).catch((error) => {
        console.log(error);
    });
});

module.exports = app;