import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Quiz App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Password OTP',
    html: `Your OTP to reset password is: <b>${otp}</b> . It is valid for 10 minutes.`,
  });
};
