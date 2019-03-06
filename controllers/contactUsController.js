// const nodemailer = require("nodemailer");
const config = require("../config/config.json")
let controller = {
    email: async (req, res) => {
        const { subject, message, email } = req.body;
        try {
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(config.sendGridApiKey);
            const msg = {
                to: config.adminEmail,
                from: email,
                subject,
                text: message,
                html: '<strong>from Online-App</strong>',
            };
            sgMail.send(msg);
            res.status(200).send("email success");
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }

        // var smtpTransport = nodemailer.createTransport({
        //     service: 'SendGrid',
        //     auth: {
        //         user: config.SendGridUser,
        //         pass: config.SendGridPassword
        //     }
        // });
        // var mailOptions = {
        //     to: config.adminEmail,
        //     from: email,
        //     subject,
        //     text: message
        // };

        // smtpTransport.sendMail(mailOptions, function (err) {
        //     if (err) {
        //         res.status(500).send(err)
        //     }
        //     else {
        //         res.status(200).send("email success")
        //     }
        // });
    }


}

module.exports = controller;