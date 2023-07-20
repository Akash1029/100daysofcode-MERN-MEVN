var nodemailer = require('nodemailer');
require("dotenv").config();

module.exports.transporter = nodemailer.createTransport({
    port: process.env.MAIL_PORT,               // true for 465, false for other ports
    host: process.env.MAIL_HOST,
       auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
         },
    secure: true,
});