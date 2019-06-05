'use strict';
const nodeMailer = require('nodemailer');

const logo='data:image/png;base64,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';

const getDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const dateTime = `${year}/${month<10 ? `0${month}`:month}/${day<10 ? `0${day}`:day}
                    ${hour}:${minutes<10? `0${minutes}`:minutes}:${seconds<10? `0${seconds}`:seconds}`;
  return dateTime;
}

const transporter = nodeMailer.createTransport({
  host: 'mail.privateemail.com',//'smtp.host.tld', //host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD // generated ethereal password
  }
});

// module.exports.contact = (event, context, callback) => {
module.exports.contact = (req, res) => {
  // console.log("req-->", req);
  // console.log("res-->", res);
  // console.log("callback-->", callback);

  res
    .set('Access-Control-Allow-Origin', process.env.DOMAIN_NAME)
    .set('Access-Control-Allow-Methods', 'GET, POST')
    .set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === `OPTIONS`) {
    //2xx Success | 204 No Content
    res
      .set('Access-Control-Max-Age', '1800') //indicates how long the results of a preflight request (that is the information contained in the Access-Control-Allow-Methods and Access-Control-Allow-Headers headers) can be cached.
      .status(204).send({statusCode:204,body: JSON.stringify({message:'CORS Verification'})});
      console.log("CORS Verificated");
      return;
  }

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
            <p><b>Phone: </b>${body.phone||'-'}</p>
            <p><b>E-mail: </b>${body.email||'-'}</p>
            <p><b>Comments: </b>${body.comments||'-'}</p>
            <p><b>Want a call? </b>${body.callBack?'Yes':'No'}</p>
            <br />
            <div style='text-align: center;'>
              <img style="margin: auto; display: block;" src='${logo}'/>
              <br />
              <p style='font-weight: bold;'>Date: ${getDateTime()}</p>
            </div>  
          </div>` 
    || `[No message] 💻 ${getDateTime()}` // html body
    //<img src='cid:${process.env.DOMAIN_NAME}'/>
    // attachments: [{
    //   filename: 'Logo_192.png',
    //   path: '/images',
    //   cid: process.env.DOMAIN_NAME //same cid value as in the html img src
    // }]
  };

  // verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log("Connection Configuration Error-->", error);
      //5xx Server Error | 503 Service Unavailable
      res.status(503).send({statusCode:503,body: JSON.stringify({message:'Service not available'})});
      return;
    } else {
      // console.log("Server is ready to send messages");
    }
  });

  (body.name && body.email) ?
  transporter.sendMail(mailOpts, (error, info) => {
    //2xx Success - 200 OK | 5xx Server Error - 500 Internal Server Error
    const statusCode = error ? 500 : 200;
    const response = {
      statusCode,
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': process.env.DOMAIN_NAME
      // },
      body: JSON.stringify({
        message: error ? error.message : info
      })
    }
    res.status(statusCode).send(response);
    return;
    // only needed when using pooled connections
    // transporter.close();
  })
  :
  //4xx Client Error | 400 Bad Request
  res.status(400).send({statusCode:400,body: JSON.stringify({message:'Invalid information'})});
};
