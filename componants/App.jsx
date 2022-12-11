import React, { useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {useDispatch} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

import Footer from "./Footer";
import NavBar from "./NavBar";

import "../style.css";
import Animation from "./Animation";
import Alert from "./Alert";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import { getUser } from "../redux/features/user/userSlice";


const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUser())
    console.log('app remounted')
  },[dispatch])
  return (
      <BrowserRouter>
      <ToastContainer />
      <LoadingOverlay />
        <Alert></Alert>
        <NavBar />
        <Animation></Animation>
        <Footer />
      </BrowserRouter>
  );
};

export default App;
