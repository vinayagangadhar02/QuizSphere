import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { sendOTPEmail } from '../utils/sendEmail.js';





export const sendAdminOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const otp = crypto.randomInt(100000, 999999).toString();
    admin.resetOTP = otp;
    admin.resetOTPExpires = Date.now() + 10 * 60 * 1000; 
    await admin.save();

    await sendOTPEmail(email, otp);

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending admin OTP:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const verifyAdminOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin || admin.resetOTP !== otp || Date.now() > admin.resetOTPExpires) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const newAdminPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    admin.resetOTP = undefined;
    admin.resetOTPExpires = undefined;

    await admin.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error setting new password:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
