import { createSlice } from "@reduxjs/toolkit";
import {
    faCircleCheck,
    faCartPlus,
  } from "@fortawesome/free-solid-svg-icons";

const alertSlice = createSlice({
    name: "alert",
    initialState: {
        data:{
            header: '',
            description: '',
            icon1: faCircleCheck,
            icon2: faCartPlus,
            y: '-200%'
        }
    },
    reducers: {
        showAlert: (state, action) => {
            state.data = action.payload;
        },

    },
});

export const { showAlert } = alertSlice.actions;
export default alertSlice.reducer;
