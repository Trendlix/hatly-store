import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import tokenReducer from "./tokenRedux";
import recentlyReducer from "./recentlyRedux";
import alertReducer from "./alertReducer";
import { userReducer } from "./features/user/userSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    token: tokenReducer,
    recently: recentlyReducer,
    alert: alertReducer,
    user : userReducer
  },
});
