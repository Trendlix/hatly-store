import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SidebarState {
  isOpened: boolean;
}

const initialState: SidebarState = {
  isOpened: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state: SidebarState) => {
      state.isOpened = true;
    },
    closeSidebar: (state: SidebarState) => {
      state.isOpened = false;
    },
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;

export const sidebarReducer = sidebarSlice.reducer;

export const isSidebarOpened = (state: RootState) => state.sidebar.isOpened;
