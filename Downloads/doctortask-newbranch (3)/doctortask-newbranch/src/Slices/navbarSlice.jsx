import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    isMobileMenuOpen: false,
    isMobileScreen:false,
  },
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setIsMobileScreen : (state) =>{
        state.isMobileScreen = !state.isMobileScreen;
    }
  },
});

export const { toggleMobileMenu ,setIsMobileScreen,isMobileMenuOpen,isMobileScreen} = navbarSlice.actions;

export default navbarSlice.reducer;
