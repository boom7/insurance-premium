import { Request, Response } from 'express';
import Joi from 'joi';
import { calculatePremium } from '../services/premiumService';

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  genderCd: Joi.string().required(),
  dob: Joi.string().required(),
  planCode: Joi.string().required(),
  premiumPerYear: Joi.number().positive().required(),
  paymentFrequency: Joi.string().required(),
});

export const handlePremiumCalculation = async (req: Request, res: Response) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        message: 'Invalid input',
        details: error.details.map((detail) => detail.message),
      });
      return;
    }

    const premiumData = req.body;
    const result = await calculatePremium(premiumData);

    res.json(result);
  } catch (error) {
    console.error('Premium calculation failed:', error);
    res.status(500).json({ error: 'Premium calculation failed' });
  }
};
