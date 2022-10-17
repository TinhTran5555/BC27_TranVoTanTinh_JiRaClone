import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Modules/Auth/slice/authSlice';
import userReducer from '../Modules/User/slice/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export const userSelector = (state) => state.user;

export const authSelector = (state) => state.auth;
