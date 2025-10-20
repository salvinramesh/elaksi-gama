// test-mail.js
import nodemailer from 'nodemailer';

async function run() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS for port 465
    auth: {
      user: 'elaksiatelier1@gmail.com',
      pass: 'rock vroy vuoa eysw'
    },
    logger: true,
    debug: true
  });

  try {
    console.log('Verifying transporter...');
    await transporter.verify();
    console.log('Verified OK.');

    const info = await transporter.sendMail({
      from: '"Elaksi Atelier" <elaksiatelier1@gmail.com>',
      to: 'salvinramesh@gmail.com',
      subject: 'Node SMTP test',
      text: 'This is a test from Node script.'
    });
    console.log('Sent, messageId:', info.messageId);
  } catch (err) {
    console.error('SMTP test error:', err);
  }
}

run();
