const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendMail = async (to, subject, html) => {
  try {
    const email = new brevo.SendSmtpEmail();

    email.sender = {
      name: "Lottery Admin",
      email: process.env.FROM_EMAIL,
    };

    email.to = [
      {
        email: to,
      },
    ];

    email.subject = subject;
    email.htmlContent = html;

    const response = await apiInstance.sendTransacEmail(email);

    console.log("✅ Email Sent Successfully");
    console.log(response.body);

    return response.body;
  } catch (err) {
    console.error("❌ Brevo Email Error");

    if (err.response) {
      console.error(err.response.text);
    } else {
      console.error(err);
    }

    throw err;
  }
};

module.exports = sendMail;