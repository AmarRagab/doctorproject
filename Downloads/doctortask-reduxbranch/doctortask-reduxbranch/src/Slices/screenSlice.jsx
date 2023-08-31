import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const setIsMobileScreenAsync = createAsyncThunk(
  'navbar/setIsMobileScreenAsync',
  async (isMobile) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return isMobile;
  }
);

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    isMobileMenuOpen: false,
    isMobileScreen: false,
  },
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setIsMobileScreenAsync.fulfilled, (state, action) => {
        state.isMobileScreen = action.payload;
      });
  },
});

export const { toggleMobileMenu } = navbarSlice.actions;

export default navbarSlice.reducer;
