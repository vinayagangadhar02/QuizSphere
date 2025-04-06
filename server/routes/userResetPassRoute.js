import express from 'express';
import { sendUserOTP, verifyUserOTP ,newUserPassword} from '../controllers/userPassReset.js'


const router = express.Router();

router.post('/user-send-otp', sendUserOTP);
router.post('/user-verify-otp', verifyUserOTP);
router.post('/user-reset-password', newUserPassword);


export default router;