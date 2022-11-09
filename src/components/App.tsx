import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import { Provider } from "react-redux";
import store from "../app/store";
import ContactUs from "../pages/ContactUs/ContactUs";
import Navbar from './Navbar'
import Footer from "./Footer";
import SideBar from "./Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AboutUs from "../pages/AboutUs/AboutUs";
const App: FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer />
        <Navbar />
        <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        <Footer/>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
