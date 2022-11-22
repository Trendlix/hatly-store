import React, { FC } from "react";
import TopIntro from "../../components/TopIntro";
import Navbar from "../../components/Navbar";
import BottomIntro from "../../components/BottomIntro";
import FrontDrop from "../../assets/frontdrop.png";
import BackDrop1 from "../../assets/backdrop-home-1.png";
import BackDrop2 from "../../assets/backdrop-home-2.png";
import SideBar from "../../components/Sidebar/Sidebar";
import About from "../../components/home/About";
import OurServices from "../../components/home/OurServices";
import Footer from "../../components/Footer";
const Home: FC = () => {
  return (
    // <section
    //   style={{ background: "linear-gradient(180deg, #FFC0CB 50%, #00FFFF 50%)" }}
    //   className="cotainer min-h-screen"
    // ></section>
    <>
      <div className=" text-nav_black relative max-w-[100vw] ">
        <div className="bg-secondary main-height">
          
          <TopIntro />
        </div>

        <div className="bg-primary  h-[40vh] top-[60vh] ">
          <BottomIntro />
        </div>
        <img
          className="absolute bottom-0 md:left-[5%] max-md:relative max-md:mt-[-3rem] max-md:w-full max-md:hidden max-md:bg-primary  w-1/3 z-10"
          src={FrontDrop}
          alt="waves"
        />
        <img
          className="absolute bottom-0 max-lg:bottom-[-20%] left-[-10rem] lg:left-[-10rem] max-lg:hidden w-[57.5%]"
          src={BackDrop2}
          alt="waves"
        />
        {/* <div className="absolute top-0 h-screen left-1/2"> */}
        {/* <img 
      className="w-full h-full"
      src={BackDrop1} 
      alt="waves" /> */}
        {/* </div>  */}
        {/* </div> */}
      </div>
      {/* about */}
      <About />
      {/* our services */}
      {/* <OurServices /> */}
    </>
  );
};

export default Home;
