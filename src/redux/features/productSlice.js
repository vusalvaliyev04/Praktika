

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("products", async () => {
  const { data } = await axios("https://dummyjson.com/products");
  return data.products;
});

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    wishlist: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.wishlist.find((product) => product.id === item.id);
      if (!existingItem) {
        state.wishlist.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((product) => product.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = productSlice.actions;
export default productSlice.reducer;
