const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4, // force IPv4 — avoids ENETUNREACH on hosts without IPv6 routing to Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"nexRound" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your nexRound verification code",
    html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  });
};

module.exports = { sendOtpEmail };
