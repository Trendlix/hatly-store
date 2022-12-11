import { createSlice } from "@reduxjs/toolkit";

const recentlySlice = createSlice({
  name: "recently",
  initialState: {
    products:
      // localStorage.getItem("product") == null
        // ? JSON.parse(localStorage.getItem("product"))
        // : [],
        []
  },
  reducers: {
    storeData: (state, action) => {
      state.products = action.payload.recentlyData;
    },
  },
});

export const { storeData } = recentlySlice.actions;
export default recentlySlice.reducer;
