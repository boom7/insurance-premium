import express from 'express';
import { handlePremiumCalculation } from '../controllers/premiumController';

const router = express.Router();

router.post('/premium-calculation', handlePremiumCalculation);

export default router;
