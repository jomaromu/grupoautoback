const express = require('express');
const nodemailer = require("nodemailer");
const bodyParse = require('body-parser');

const app = express();
app.use(bodyParse.urlencoded({ extended: true }));

app.post('/', (req, resp, next) => {

    const main = async() => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'jomaromu2@gmail.com', // generated ethereal user
                pass: '2009momomo.' // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <jomaromu2@gmail.com>', // sender address
            to: "jomaromu2@gmail.com, jomaromu2@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log(info.messageId);

    }

    main().then((resp) => {
        console.log(resp);
    }).catch((resp) => {
        console.log(resp);
    });
});

module.exports = app;