import axios from 'axios';
import { fetchProducts } from '../../src/services/productService';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('productService', () => {
  it('should fetch products successfully', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [{ planCode: 'T11A20', packageName: 'Basic Plan' }],
    });

    const products = await fetchProducts();

    expect(products).toHaveLength(1);
    expect(products[0]).toHaveProperty('planCode', 'T11A20');
    expect(products[0]).toHaveProperty('packageName', 'Basic Plan');
  });

  it('should throw an error if fetching products fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));
    
    await expect(fetchProducts()).rejects.toThrow('Error fetching products: Network Error');
  });
});
