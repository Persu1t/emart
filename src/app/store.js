// Defining store for the reducers
import { configureStore } from '@reduxjs/toolkit';
import {productReducer} from '../redux/productReducer';
import { userReducer } from '../redux/signupReducer';
import { cartReducer } from '../redux/cartReducer';

export const store = configureStore({
  reducer: {
    productReducer,
    userReducer,
    cartReducer
  }
});
