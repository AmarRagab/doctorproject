import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    formData: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    errors: {},
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setFormErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearForm: (state) => {
      state.formData = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
      state.errors = {};
    },
  },
});

export const { setFormData, setFormErrors, clearForm } = registerSlice.actions;

export default registerSlice.reducer;
