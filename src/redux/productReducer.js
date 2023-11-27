// importing the createSlice and the createAsyncThunk from the redux toolkit
import {db} from "../firebaseinit"
import { collection, getDocs } from "firebase/firestore";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// This is the createAsyncThunk function which deals with the Api request and asynchronous data
const fetchItems = createAsyncThunk("productsList/getItems", async () => {
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return products
});
const initialState = {
  data: [],
  isLoading: false,
  error: "",
};

const productSlice = createSlice({
  name: "productsList",
  initialState: initialState,
  reducers:{
    productsPage:(state, action) => {
      const id = action.payload.id;
      console.log(id)
    }
  },
  // extrareducers based on the promise state returened by the createAsyncThunk function
  extraReducers: {
    // if promise stgate is full filled
    [fetchItems.pending]: (state, action) => {
      state.isLoading = true;
    },
    // if promise stgate is rejected
    [fetchItems.fulfilled]: (state, action) => {
      state.data = action.payload
      state.isLoading = false;
      state.error = "No error"
    },
    // if promise stgate is pending
    [fetchItems.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

//  exporting productReducer, action, fetchProductItems and productSelector
export const productReducer = productSlice.reducer;
export const action = productSlice.actions;
export const fetchProductItems = fetchItems;
export const productSelector = (state) => state.productReducer;
