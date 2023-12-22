// Defining store for the reducers
import { configureStore } from '@reduxjs/toolkit';
import {productReducer} from '../redux/productReducer';
import { userReducer } from '../redux/signupReducer';
import { googleReducer } from '../redux/googleLoginReducer';

export const store = configureStore({
  reducer: {
    productReducer,
    userReducer,
    googleReducer
  }
});
