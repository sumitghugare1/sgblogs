

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


const sendThankYouEmail = (toEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: toEmail, 
    subject: 'Thank You for Reaching Out!',
    text: 'Thank you for contacting us! We appreciate your message and will get back to you soon.',
    
    
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendThankYouEmail };
