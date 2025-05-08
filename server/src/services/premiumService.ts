import axios from 'axios';
import PremiumCalculation from '../models/premiumCalculation';

export const calculatePremium = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.API_BASE_URL}/premium-calculation`,
      data,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-api-key': process.env.API_KEY,
          'cache-control': 'no-cache',
        },
      }
    );
    
    // save it to the database
    await PremiumCalculation.create({
      ...data,
      result: response.data,
    });

    return response.data;
  } catch (error: any) {
    throw new Error('Error calculating premium: ' + error.message);
  }
};
