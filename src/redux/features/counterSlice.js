import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incByCount: (state, action) => {
      state.value = state.value + action.payload;
    },
    
  },
});

export default counterSlice.reducer;
export const { increment, decrement, incByCount } = counterSlice.actions;