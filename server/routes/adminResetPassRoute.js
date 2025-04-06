import express from 'express';
import { sendAdminOTP, verifyAdminOTP ,newAdminPassword} from '../controllers/adminPassReset.js'


const router = express.Router();

router.post('/admin-send-otp', sendAdminOTP);
router.post('/admin-verify-otp', verifyAdminOTP);
router.post('/admin-reset-password', newAdminPassword);


export default router;