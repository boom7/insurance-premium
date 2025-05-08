import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  formData: any;
  result: any;
  validationErrors: Record<string, string>;  
  isValid: boolean;  
}

const initialState: FormState = {
  formData: {},
  result: null,
  validationErrors: {},  
  isValid: true,  
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<any>) {
      state.formData = action.payload;
    },
    setCalculationResult(state, action: PayloadAction<any>) {
      state.result = action.payload;
    },
    setValidationError(state, action: PayloadAction<{ field: string; message: string }>) {
      state.validationErrors[action.payload.field] = action.payload.message;
      state.isValid = false;  // Set form as invalid if there's an error
    },
    removeValidationError(state, action: PayloadAction<string>) {
      delete state.validationErrors[action.payload];
      // If there are no more errors, set form as valid
      if (Object.keys(state.validationErrors).length === 0) {
        state.isValid = true;
      }
    },
    resetValidation(state) {
      state.validationErrors = {};  // Reset errors
      state.isValid = true;  // Reset form validity to true
    },
  },
});

export const { setFormData, setCalculationResult, setValidationError, removeValidationError, resetValidation } = formSlice.actions;
export default formSlice.reducer;
