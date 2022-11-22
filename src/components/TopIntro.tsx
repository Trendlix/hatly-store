import React, { FC } from "react";

import BackDrop1 from "../assets/backdrop-home-1.png";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import slider1 from "../assets/slider1.jpg"
import slider2 from "../assets/slider2.jpg"
const TopIntro: FC = () => {
  return (
    <div className="relative">
      <div className="intro__text md:absolute left-1/2 max-lg:left-[5%]  top-8 max-md:w-full">
        <h1 className="font-black text-3xl md:text-5xl lg:text-7xl max-md:text-center">
          Let's Get
          <br className="max-md:hidden" />
          <span className="md:pl-20"> Connected</span>
        </h1>
        <div className="intro__description text-center md:px-12 pt-4 pb-2 font-semibold">
          <p>
            In waves seasons we design an amazing getaway for our audience to
            become the most anticipated destination for them and their families
            to create memorable moments
          </p>
        </div>
        <div className="flex justify-center my-4">
          <span className="read__more_btn inline-block">
            <button type="button" className="bg-primary px-4 py-1 ">
            Register Now
            </button>
          </span>
        </div>
        <div className="slider md:hidden py-2 ">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <img src={slider1} alt="slider" className="w-full"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt="slider" className="w-full"/>
        </SwiperSlide>
        </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopIntro;
