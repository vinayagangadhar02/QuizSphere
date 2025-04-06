import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { sendOTPEmail } from '../utils/sendEmail.js';


export const sendUserOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'user not found' });

    const otp = crypto.randomInt(100000, 999999).toString();
    user.resetOTP = otp;
    user.resetOTPExpires = Date.now() + 10 * 60 * 1000; 
    await user.save();

    await sendOTPEmail(email, otp);

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {

    res.status(500).json({ error: 'Server error' });
  }
};


export const verifyUserOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.resetOTP !== otp || Date.now() > user.resetOTPExpires) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const newUserPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'user not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    
    res.status(500).json({ error: 'Server error' });
  }
};
