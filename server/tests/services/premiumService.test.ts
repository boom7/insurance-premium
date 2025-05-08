import axios from 'axios';
import { calculatePremium } from '../../src/services/premiumService'; // Adjust the path to your file
import PremiumCalculation from '../../src/models/premiumCalculation';

jest.mock('axios');

describe('premiumService', () => {
  it('should calculate premium successfully', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { premiumAmount: 5000, success: true }
    });

    PremiumCalculation.create = jest.fn().mockResolvedValue(true);

    const premiumData = {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'MALE',
      dob: '1980-01-01',
      planCode: 'T11A20',
      premiumPerYear: 30000,
      paymentFrequency: 'YEARLY',
    };

    const result = await calculatePremium(premiumData);

    expect(result).toEqual({ premiumAmount: 5000, success: true });
    expect(PremiumCalculation.create).toHaveBeenCalledWith({
      ...premiumData,
      result: { premiumAmount: 5000, success: true },
    });
  });

  it('should throw an error if premium calculation fails', async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const premiumData = {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'MALE',
      dob: '1980-01-01',
      planCode: 'T11A20',
      premiumPerYear: 30000,
      paymentFrequency: 'YEARLY',
    };

    await expect(calculatePremium(premiumData)).rejects.toThrow(
      'Error calculating premium: Network Error'
    );
  });
});
