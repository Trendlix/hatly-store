import React, { FC } from "react";
import CloseWrapper from "../CloseBtn/CloseWrapper";
import { useSelector } from "react-redux";
import { isSidebarOpened } from "../../features/sidebar/sidebar-slice";
import { Link } from "react-router-dom";
// import CloseWrapper from '../UI/CloseWrapper'
// import style from './Sidebar.module.css'

const SideBar: FC = (props) => {
  const isOpened = useSelector(isSidebarOpened);
  return (
    <div
      className={`fixed top-0 bottom-0 right-0 sidebar_bg ml-1 z-[1000] w-[300px] duration-150 translate-x-[100%] ${
        isOpened === true ? "translate-x-0" : ""
      }`}
    >
      <CloseWrapper />
      <div className="flex flex-col text-start py-4 px-8">
          <Link className="sidebar__element" to="/">Home</Link>
          <Link className="sidebar__element" to="#waves">About us</Link>
          <Link className="sidebar__element" to="#waves">Our Services</Link>
          <Link className="sidebar__element" to="#waves">Events</Link>
          <Link className="sidebar__element" to="/contact-us">Contact Us</Link>
      </div>
    </div>
  );
};

export default SideBar;
