import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
}
const sidebarSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpened = true;
    },
    close: (state) => {
      state.isOpened = false;
    }
  }
})

export const sidebarState = state => state.sidebar;
export const sidebarReducer = sidebarSlice.reducer;
export const sidebarActions = sidebarSlice.actions;