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

const today = () => {
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  var d = now.getDate();
  return ` ${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`;
}

// module.exports.contact = (event, context, callback) => {
module.exports.contact = (req, res) => {
  // console.log("req-->", req);
  // console.log("res-->", res);
  // console.log("callback-->", callback);

  const body = req.body;
  console.log("body-->", body);
  const mailOpts = {
    // from: body.from || `"Fred Foo 👻" <${process.env.CONTACT_ADDRESS}>`,
    from: `${body.name ? body.name:'Contact Page'} 📧 <${process.env.CONTACT_ADDRESS}>`,
    to: process.env.CONTACT_ADDRESS,
    //cc: [],
    //bcc: body.bcc || '',
    subject: body.subject ? `${body.subject} - Contact Page`:'Contact Page', //+ Date.now().toString(),//millisecond
    text: body.text || '[No text message]', // plain text body
    html: `<div>
            <p><b>Name: </b>${body.name||'-'}</p>
            <p><b>E-mail: </b>${body.email||'-'}</p>
            <p><b>Phone: </b>${body.phone||'-'}</p>
            <p><b>Comments: </b>${body.comments||'-'}</p>
            <p><b>Want a call? </b>${body.callBack?'Yes':'No'}</p>
            <br />
            <span style='text-align: center; font-weight: bold;'>Contact Date: ${today()}</span>
            <br />
            <img src='cid:${process.env.DOMAIN_NAME}'/>
          </div>` 
    || `[No message] 💻 ${today()}`, // html body
    attachments: [{
      filename: 'Logo_192.png',
      path: '/images',
      cid: process.env.DOMAIN_NAME //same cid value as in the html img src
    }]
  };

  // verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log("Connection Configuration Error-->", error);
    } else {
      // console.log("Server is ready to send messages");
    }
  });

  transporter.sendMail(mailOpts, (error, info) => {
    const response = {
      statusCode: error ? 500 : 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.DOMAIN_NAME
      },
      body: JSON.stringify({
        message: error ? error.message : info
      })
    }
    res.send(response);

    // only needed when using pooled connections
    // transporter.close();
  });
};
