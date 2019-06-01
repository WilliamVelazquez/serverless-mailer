'use strict';
const nodeMailer = require('nodemailer');

var CONTACT_ADDRESS = 'info@williamvelazquez.com';
// var querystring = require('querystring');

// var mailer = require('nodemailer').createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.GMAIL_ADDRESS,
//     pass: process.env.GMAIL_PASSWORD,
//   }
// });

const transporter = nodemailer.createTransport({
  host: 'smtp.host.tld', //host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD // generated ethereal password
  }
});

module.exports.contact = (event, context, callback) => {
  //var body = querystring.parse(event.body);
  // let body = 'Body Test';
  const body = '';
  const mailOpts = {
    from: body.from || '"Fred Foo 👻" <foo@example.com>',
    to: CONTACT_ADDRESS,
    //bcc: body.bcc || '',
    subject: body.subject || '[No subject]' + Date.now(),
    text: body.text || 'Test Text Body', // plain text body
    html: body.message || '[No message]  <p><b>Hello<br/>World!</b></p>' // html body
  };

  transporter.sendMail(mailOpts, (error, info) => {
    // if (err) return callback(err);
    // callback(null, { statusCode: 200, body: 'Success!' });
    if (error) {
      console.log('Error occurred--->');
      console.log(error.message);
      return process.exit(1);
    }

    console.log('Message sent successfully--->');
    console.log(nodemailer.getTestMessageUrl(info));

    // only needed when using pooled connections
    // transporter.close();
  });
};
