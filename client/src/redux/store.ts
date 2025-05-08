import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
