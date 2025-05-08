import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${process.env.API_BASE_URL}/getProducts`);
  
    return response.data; 
  } catch (error: any) {
    throw new Error("Error fetching products: " + error.message);
  }
};
