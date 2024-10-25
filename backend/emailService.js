// emailService.js

const nodemailer = require('nodemailer');

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use another email service provider if needed
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Function to send a thank-you email
const sendThankYouEmail = (toEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: toEmail, // Recipient address
    subject: 'Thank You for Reaching Out!',
    text: 'Thank you for contacting us! We appreciate your message and will get back to you soon.',
    // You can also use HTML for the email body
    // html: '<p>Thank you for contacting us! We appreciate your message and will get back to you soon.</p>',
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendThankYouEmail };
