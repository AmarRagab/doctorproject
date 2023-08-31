import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    formData: {
      username: '',
      password: '',
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
        password: '',
      };
      state.errors = {};
    },
  },
});

export const { setFormData, setFormErrors, clearForm } = loginSlice.actions;

export default loginSlice.reducer;
