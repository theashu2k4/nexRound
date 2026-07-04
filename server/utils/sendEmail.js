import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use a Gmail App Password, not your real password
  },
});

export const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"nexRound" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your nexRound verification code",
    html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  });
};
