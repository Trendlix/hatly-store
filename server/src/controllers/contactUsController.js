const nodemailer = require('nodemailer');

const config = require('../config');

const Email = async (options) => {
  console.log(config.email)
  let transporter = nodemailer.createTransport({
    service: 'gmail', //i use outlook
    auth: {
      user: config.email, // email
      pass: config.emailPassword, //password
    },
  });
  try {
    await transporter.sendMail(options);
  } catch (e) {
    throw new Error(e);
  }
};

// send email
const EmailSender = async ({
  fullName,
  email,
  phone,
  message
}) => {
  const options = {
    from: "contact us",
    to: config.email,
    subject: 'Message From Contact US',
    html: `
        <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
          <div style="width: 100%; background-color: #00efbc; padding: 20px 0">
          
          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
              From contact us form
            </p>
            <div style="font-size: .8rem; margin: 0 30px">
              <p>FullName: <b>${fullName}</b></p>
              <p>Email: <b>${email}</b></p>
              <p>Phone: <b>${phone}</b></p>
              <p>Message: <i>${message}</i></p>
            </div>
          </div>
        </div>
      </div>
        `,
  };
  try {
    await Email(options)
    
  } catch (e) {
    throw new Error(e);
  }
};
const sendEmail = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      message
    } = req.body
    await EmailSender({
      fullName,
      email,
      phone,
      message
    })
    res.json({
      ok : true,
      code : 200,
      message: "Your message sent successfully",
    });
  } catch (e) {
    console.log(e.message)
    res.status(500).json({
      ok: false , 
      code : 500,
      message: "internal server error"
    });
  }
}

module.exports = {sendEmail}