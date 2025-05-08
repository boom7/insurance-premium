import { Request, Response } from 'express';
import { fetchProducts } from '../services/productService';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await fetchProducts(); 

    res.json(products); 
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' }); 
  }
};
