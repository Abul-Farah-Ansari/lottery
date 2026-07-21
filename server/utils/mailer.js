const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: Number(process.env.BREVO_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

const sendMail = async (to, subject, html) => {
  return transporter.sendMail({
    from: `"Lottery Admin" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;