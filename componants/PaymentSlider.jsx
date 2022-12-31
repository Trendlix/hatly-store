import React, { useEffect, useRef } from "react";
// import Swiper core and required modules
import SwiperCore, { Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import cairo from "../img/cairo.png";
import cib from "../img/Cib_Logo.svg.png";

import masary from "../img/Masary.png";
import momkn from "../img/Momkn-Egypt-22716-1487193965-og.png";
import saib from "../img/Saib bank.png";
import owda from "../img/oda.png";
import vodafon from "../img/Vodafone-Logo.png";

// import aman from "../img/HATLY NEW PAYMENTS METHODS/Aman.png";
import aman from "../img/HATLY NEW PAYMENTS METHODS/AmanNew.png";

import bankAhly from "../img/HATLY NEW PAYMENTS METHODS/Bank-ElAhly.png";
import bankMasr from "../img/HATLY NEW PAYMENTS METHODS/Bank-Masr.png";
import forsa from "../img/HATLY NEW PAYMENTS METHODS/forsa.png";
import Mashreq from "../img/HATLY NEW PAYMENTS METHODS/Mashreq.png";
import masterCard from "../img/HATLY NEW PAYMENTS METHODS/masterCard.png";
import Meeza from "../img/HATLY NEW PAYMENTS METHODS/Meeza.png";
import NBK from "../img/HATLY NEW PAYMENTS METHODS/NBK.png";
import valu from "../img/HATLY NEW PAYMENTS METHODS/valu.png";
import Shahry from "../img/HATLY NEW PAYMENTS METHODS/Shahry-Egypt.png";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
const PaymentSlider = (props) => {
  SwiperCore.use([Autoplay]);
  const slider = useRef()
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    // <Swiper
    //   breakpoints={{
    //     0 :{
    //       slidesPerView : 2
    //     },
    //     500: {
    //       // width: 576,
    //       slidesPerView: props.number,
    //     },
    //     992: {
    //       // width: 768,
    //       slidesPerView: props.number * 1.5,
    //     },
    //     1200:{
    //       slidesPerView:props.number * 2,
    //     }
    //   }}
    //   // slidesPerView={3}
    //   spaceBetween={10}
    //   autoplay={{
    //     delay: 1000,
    //   }}
    // >
    // <div className="paymentSlider">
      // <div className="paymentSliderContainer">
    <Slider ref={slider} {...settings} className="paymentSlider">
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={cairo} alt="cairo bank" width={cairo.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={masary} alt="aman" width={masary.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={cib} alt="vodafon" width={cib.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={momkn} alt="masary" width={momkn.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={saib} alt="alahly" width={saib.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={owda} alt="mmoken" width={owda.width} />
        </div>
        {/* <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={vodafon} alt="bank du cairo" width={vodafon.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={aman} alt="aman" width={aman.width} />
        </div> */}
        {/* new payments by hamed */}

{/* 
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={bankAhly} alt="Bank Ahly" width={bankAhly.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={bankMasr} alt="Bank Masr" width={bankMasr.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={forsa} alt="Bank Ahly" width={forsa.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={Mashreq} alt="Mashreq" width={Mashreq.width} />
        </div>

        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={masterCard} alt="masterCard" width={masterCard.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={Meeza} alt="Meeza" width={Meeza.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={NBK} alt="NBK" width={NBK.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={valu} alt="valu" width={valu.width} />
        </div>
        <div className="paymentSlideItem" style={{ justifyContent: "center" }} align="center">
          <Image src={Shahry} alt="Shahry Egypt" width={Shahry.width} />
        </div> */}
      </Slider>
      // </div>
      // </div>
    // </Swiper>
  );
};

export default PaymentSlider;
