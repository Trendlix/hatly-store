import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import process.env.API_URL from "../API/ApiUrl";

axios.defaults.withCredentials = true;

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    loggingIn: (state) => {
      state.loading = true;
    },
    loggingOut: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.message = null;
    },
    logoutFailed: (state) => {
      state.loading = false;
    }
  },
});

export const userState = state => state.user;
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

export const getUser = () => {
  return async (dispatch) => {
    try {
      dispatch(userSlice.actions.loggingIn());
      const req = await axios.get(`${process.env.API_URL}/users/me`);
      dispatch(userSlice.actions.loginSuccess({ user: req.data.body }));
    } catch (e) {
      dispatch(userSlice.actions.loginFailed());
    }
  }
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(userSlice.actions.loggingOut());
      await axios.get(`${process.env.API_URL}/users/logout`);
      dispatch(userSlice.actions.logout());
    } catch (e) {
      dispatch(userSlice.actions.logoutFailed());
    }
  }
};
