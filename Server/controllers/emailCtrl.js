var app = require('./../index'),
    nodemailer = require('nodemailer');

module.exports = {
  mail: function(req, res) {
    console.log(req.file.buffer);
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'sarahgreggart@gmail.com', // Your email id
              pass: process.env.EMAIL_PASSWORD // Your password
          }
      });
        if (!req.file) {
           var mailOptions = {
              from: [req.body.email],
              to: ['sarahgreggart@gmail.com', req.body.email],
              subject: req.body.name,
              text: req.body.text
           };
        }
        else {
           var mailOptions = {
              from: [req.body.email],
              to: ['sarahgreggart@gmail.com', req.body.email],
              subject: req.body.name,
              text: req.body.text,
              attachments: [
                 {
                    filename: req.file.originalname,
                    content: req.file.buffer
                 }
              ]
           };
        }

     transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
             console.log(error);
             res.status(400).send(error);
        } else {
           res.status(200).send();
        }
     });
  }
}
