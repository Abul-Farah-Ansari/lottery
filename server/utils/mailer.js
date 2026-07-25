const { BrevoClient } = require("@getbrevo/brevo");
console.log("MAILER BREVO_API_KEY:", process.env.BREVO_API_KEY);

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendMail = async (to, subject, html) => {
  try {
    const response = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "Lottery Admin",
        email: process.env.FROM_EMAIL,
      },
      to: [
        {
          email: to,
        },
      ],
      subject,
      htmlContent: html,
    });

    console.log("✅ Email sent successfully");
    console.log(response);

    return response;
  } catch (error) {
    console.error("❌ Brevo API Error:");
    console.error(error);
    throw error;
  }
};

module.exports = sendMail;