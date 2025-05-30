require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route to fix "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Server is running.');
});

// Email sending route
app.post('/send-email', async (req, res) => {
  const { project, date, name, phone, email, comments } = req.body;

  // Configure transporter with Strato SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.strato.de',
    port: 465,
    secure: true, // true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Lichtblicke-Hartha Project Form" <info@tda-hr.de>',
    to: 'info@tda-hr.de',
    replyTo: email,
    subject: 'New Project Form Submission',
    html: `
      <h2>New Project Submission</h2>
      <p><strong>Project:</strong> ${project}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Comments:</strong><br/>${comments}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ error: 'Email sending failed.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
