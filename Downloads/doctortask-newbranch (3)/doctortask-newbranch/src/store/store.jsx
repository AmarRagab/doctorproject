import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from '../Slices/doctorSlice';
import authReducer from '../Slices/authSlice';
import navbarReducer from '../Slices/navbarSlice';
import loginReducer from '../Slices/loginSlice';
import registerReducer from '../Slices/registerSlice';
import reviewReducer from '../Slices/reviewSlice';
import tableReducer from '../Slices/tableSlices';
const store = configureStore({
  reducer: {
    doctor: doctorReducer,
    auth: authReducer,
    navbar: navbarReducer,
    login: loginReducer,
    review: reviewReducer,
    register:registerReducer,
    table:tableReducer,
  },
});

export default store;
