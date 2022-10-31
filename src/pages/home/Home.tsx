import React, { FC } from "react";
import TopIntro from "../../components/TopIntro";
import Navbar from '../../components/Navbar'
import BottomIntro from "../../components/BottomIntro";
import FrontDrop from '../../assets/frontdrop-home.png'
import BackDrop1 from '../../assets/backdrop-home-1.png'
import BackDrop2 from '../../assets/backdrop-home-2.png'
const Home: FC = () => {
  return (
    // <section
    //   style={{ background: "linear-gradient(180deg, #FFC0CB 50%, #00FFFF 50%)" }}
    //   className="cotainer min-h-screen"
    // ></section>
    <div className="h-screen text-nav_black relative max-w-[100vw] overflow-x-hidden" >
      <div className="bg-secondary h-[60vh] z-10">
      <Navbar />
      <TopIntro/>
      </div>
      <img 
      className="absolute bottom-0 left-0  max-md:relative max-md:w-full max-md:bg-primary  w-1/2 z-10"
      src={FrontDrop} 
      alt="waves" />
      <img 
      className="absolute bottom-0 left-[-6rem]  max-md:hidden   w-[60%]"
      src={BackDrop2} 
      alt="waves" />
      <div className="bg-primary max-md:bg-secondary h-[40vh] top-[60vh] z-10">
        <BottomIntro />
      </div>
      {/* <div className="absolute top-0 h-screen left-1/2"> */}
      {/* <img 
      className="w-full h-full"
      src={BackDrop1} 
      alt="waves" /> */}
    {/* </div>  */}
      {/* </div> */}
      </div>
  );
};

export default Home;
