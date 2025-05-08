import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BFF_URL}/getProducts`);
      
      if (!res.ok) {
        const text = await res.text();
        console.error('Non-OK response:', res.status, text);
        return rejectWithValue(`Failed to fetch products: ${res.status}`);
      }

      const data = await res.json();
      return data; 
    } catch (error) {
      console.error('Fetch error:', error);
      return rejectWithValue('Failed to fetch products');
    }
  }
);

interface Product {
  planCode: string;
  packageName: string;
  benefit: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Set fetched products to state
        state.error = null; // Reset error if successful
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load products';
      });
  },
});

export default productsSlice.reducer;
