'use strict';
const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
  host: 'mail.privateemail.com',//'smtp.host.tld', //host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD // generated ethereal password
  }
});

module.exports.contact = (event, context, callback) => {
  console.log("event-->", event);
  console.log("context-->", context);
  console.log("callback-->", callback);

  const body = '';
  const mailOpts = {
    from: body.from || '"Fred Foo 👻" <foo@example.com>',
    to: process.env.CONTACT_ADDRESS,
    //bcc: body.bcc || '',
    subject: body.subject || '[No subject]' + Date.now(),
    text: body.text || 'Test Text Body', // plain text body
    html: body.message || '[No message]  <p><b>Hello<br/>World!</b></p>' // html body
  };

  // verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(mailOpts, (error, info) => {
    const response = {
      statusCode: error ? 500 : 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://your-domain.com'
      },
      body: JSON.stringify({
        message: error ? error.message : info
      })
    }

    // only needed when using pooled connections
    // transporter.close();

    return callback(null, response);
  });
};
