const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendMail = async (to, subject, html) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "Lottery Admin",
      email: process.env.FROM_EMAIL,
    };

    sendSmtpEmail.to = [
      {
        email: to,
      },
    ];

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent successfully");
    console.log(response);

    return response;
  } catch (error) {
    console.error("❌ Brevo API Error");

    if (error.response) {
      console.error(error.response.body || error.response.text);
    } else {
      console.error(error);
    }

    throw error;
  }
};

module.exports = sendMail;