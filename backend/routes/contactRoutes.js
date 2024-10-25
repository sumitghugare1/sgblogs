const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Import your Contact model

const nodemailer = require('nodemailer');

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any other email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send thank you email function
const sendThankYouEmail = (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank You for Contacting Us!',
    text: 'Thank you for reaching out to us. We appreciate your message and will get back to you soon!',
  };

  return transporter.sendMail(mailOptions);
};

// POST request to /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save(); // Save the contact to the database

    // Send thank-you email after saving contact info
    await sendThankYouEmail(email);

    res.status(201).json({ message: 'Contact saved successfully and email sent!' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Failed to save contact or send email' });
  }
});

module.exports = router;
