const nodemailer = require('nodemailer');
const configEmail = require('../config').email;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: configEmail.user,
    pass: configEmail.password,
  },
});

function sendEmailWithPassword(email, password) {
  const mailOptions = {
    from: configEmail.user,
    to: email,
    subject: 'Новый пароль',
    text: `Ваш новый пароль ${ password }`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${ info.response }`);
    }
  });
}

module.exports = sendEmailWithPassword;
