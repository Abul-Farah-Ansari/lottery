const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: Number(process.env.BREVO_PORT),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

// ✅ Add this block here
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("✅ SMTP Server is ready");
  }
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