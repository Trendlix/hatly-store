import React from "react";
import Shop from "./pages/shop/Shop";
import SingleProduct from "./pages/product/SingleProduct";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUS from "./pages/contactUS/ContactUS";
import Home from "./pages/home/Home";
import { Routes, Route, useLocation ,Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {useSelector} from "react-redux"
import PaymentResponse from "./pages/payment_response/PaymentResponse";
import Error404 from "./pages/error_page/Error404";
import Policy from "./pages/policy/Policy";
import OurStore from "./pages/our_store/OurStore";
import PaymentMethod from "./pages/payment_method/PaymentMethod";
import Inquiries from "./Inquiries/Inquiries";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { userState } from "../redux/features/user/userSlice";
import Account from "./pages/Account/Account";

const Animation = () => {
  const location = useLocation();
  const user = useSelector(userState);
  return (
    <AnimatePresence exitBeforeEnter >
      <Routes location={location} key={location.pathname}>
        <Route path="/" index exact element={<Home />} />
        <Route path="/shop/:category" exact element={<Shop />} />
        <Route path="/product/:id" exact element={<SingleProduct />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/checkout" exact element={<Checkout />} />
        <Route path="/about" exact element={<AboutUs />} />
        <Route path="/contact" exact element={<ContactUS />} />
        <Route path="/payment_response" exact element={<PaymentResponse />} />
        <Route path="/policy" exact element={<Policy />} />
        <Route path="/our_store" exact element={<OurStore />} />
        <Route path="/payment_methods" exact element={<PaymentMethod />} />
        <Route path="/inquiries" exact element={<Inquiries />} />
        {/* {<Route path="/login" exact element={user.isAuthenticated ? <Navigate  to="/" replace={true} /> : <Login /> } /> } */}
        {/* {<Route path="/signup" exact element={user.isAuthenticated ? <Navigate  to="/" replace={true} /> : <Signup /> } /> } */}
        <Route path="/account" exact element={<Account />} />
        <Route path="/login" exact element={<Login /> } /> 
        <Route path="/signup" exact element={<Signup />} /> 
        <Route path="*" exact element={<Error404 />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Animation;

