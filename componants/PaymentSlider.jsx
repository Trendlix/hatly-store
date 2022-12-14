import React from "react";
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


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
const PaymentSlider = (props) => {
  SwiperCore.use([Autoplay]);
  // console.log(props.number)
  return (
    <Swiper
      breakpoints={{
        0 :{
          slidesPerView : 2
        },
        500: {
          // width: 576,
          slidesPerView: props.number,
        },
        992: {
          // width: 768,
          slidesPerView: props.number * 1.5,
        },
        1200:{
          slidesPerView:props.number * 2,
        }
      }}
      // slidesPerView={3}
      spaceBetween={10}
      autoplay={{
        delay: 1000,
      }}
    >
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={cairo} alt="cairo bank" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={masary} alt="aman" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={cib} alt="vodafon" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={momkn} alt="masary" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={saib} alt="alahly" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={owda} alt="mmoken" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={vodafon} alt="bank du cairo" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={aman} alt="aman" width={170} />
      </SwiperSlide>
      {/* new payments by hamed */}
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={bankAhly} alt="Bank Ahly" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={bankMasr} alt="Bank Masr" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={forsa} alt="Bank Ahly" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={Mashreq} alt="Mashreq" width={170} />
      </SwiperSlide>

      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={masterCard} alt="masterCard" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={Meeza} alt="Meeza" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={NBK} alt="NBK" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={valu} alt="valu" width={170} />
      </SwiperSlide>
      <SwiperSlide style={{ justifyContent: "center" }} align="center">
        <Image  src={Shahry} alt="Shahry Egypt" width={170} />
      </SwiperSlide>
    </Swiper>
  );
};

export default PaymentSlider;
