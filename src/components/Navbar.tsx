import React, { FC } from "react";
import {useDispatch} from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo2.png'
import { openSidebar } from "../features/sidebar/sidebar-slice";

const Home: FC = () => {
  const dispatch = useDispatch();
  const openSidebarHandler = ():void=>{
    if(!!!(window.innerWidth <= 768))
    return;
    dispatch(openSidebar())
  }
  return (
    <div className="flex py-5 px-[5%] w-screen items-center h-20">
      <div className="logo flex align-middle">
        <img src={logo} alt="waves" className=" lg:pt-4 w-[100px] lg:w-[150px]" />
      </div>
      <ul className="flex mx-4 gap-4 lg:gap-8 lg:mx-12 max-md:hidden">
        <li className="nav__element">Home</li>
        <li className="nav__element">About us</li>
        <li className="nav__element">Our Services</li>
        <li className="nav__element">Events</li>
        <li className="nav__element">Contact Us</li>
      </ul>
      <div className="flex gap-4 flex-1 justify-end">
      <div className="border-solid border-2 border-black relative flex-1 h-max lg:max-w-[60%] max-md:hidden">
        <input type="text" placeholder="." className="outline-none px-2 py-1 bg-transparent w-full"/>
        <SearchIcon className="absolute right-1 top-1/2 -translate-y-1/2"/>
      </div>
      <span className="cursor-pointer" onClick={openSidebarHandler}>
      <MenuIcon style={{fontSize : "2rem" }}/>
      </span>
      </div>
    </div>
  );
};

export default Home;
