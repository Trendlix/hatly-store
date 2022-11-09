import React, { FC } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo2.png";
import { openSidebar } from "../features/sidebar/sidebar-slice";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const dispatch = useDispatch();
  const openSidebarHandler = (): void => {
    console.log(!!!(window.innerWidth <= 768))
    if (!!!(window.innerWidth <= 768)) return;
    dispatch(openSidebar());
  };
  return (
    <div className="flex py-4 pb-6 px-[5%]  items-center h-20 bg-secondary">
      <div className="logo flex align-middle max-md:ml-[50%] max-md:translate-x-[-50%]">
        <img
          src={logo}
          alt="waves"
          className=" lg:pt-4 w-[100px] lg:w-[150px]"
        />
      </div>
      <div className="flex mx-4 gap-4 lg:gap-8 lg:mx-12 max-md:hidden">
        <Link to="/" className="nav__element">Home</Link>
        <Link to="/about-us" className="nav__element">About us</Link>
        <Link to="/" className="nav__element">Our Services</Link>
        <Link to="/" className="nav__element">Events</Link>
        <Link to="/contact-us" className="nav__element">Contact Us</Link>
      </div>
      <div className="flex gap-4 flex-1 justify-end">
        <div className="border-solid border-2 border-black relative flex-1 h-max lg:max-w-[60%] max-md:hidden">
          <input
            type="text"
            placeholder="."
            className="outline-none px-2 py-1 bg-transparent w-full"
          />
          <SearchIcon className="absolute right-1 top-1/2 -translate-y-1/2" />
        </div>
        <span className="cursor-pointer" onClick={openSidebarHandler}>
          <MenuIcon style={{ fontSize: "2rem" }} />
        </span>
      </div>
    </div>
  );
};

export default Home;
