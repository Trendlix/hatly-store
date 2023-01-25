import React from "react";

import { wrap } from "@motionone/utils";
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

import Image from "next/image";
import ParallaxSlider from "./parallaxSlider/ParallaxSlider";
const PaymentSlider = () => {
  return (
    <ParallaxSlider  baseVelocity={-0.5}>
    <div className="paymentSliderContainer" >
      <div className="paymentSlideItem" >
        <Image blurDataURL={cairo.blurDataURL} src={cairo} alt="cairo bank" width={cairo.width} />
      </div>
      <div className="paymentSlideItem" >
        <Image blurDataURL={masary.blurDataURL} src={masary} alt="aman" width={masary.width} />
      </div>
      <div className="paymentSlideItem" >
        <Image blurDataURL={cib.blurDataURL} src={cib} alt="vodafon" width={cib.width} />
      </div>
      <div className="paymentSlideItem" >
        <Image blurDataURL={momkn.blurDataURL} src={momkn} alt="masary" width={momkn.width} />
      </div>
      <div className="paymentSlideItem" >
        <Image blurDataURL={saib.blurDataURL} src={saib} alt="alahly" width={saib.width} />
      </div>
      <div className="paymentSlideItem" >
        <Image blurDataURL={owda.blurDataURL} src={owda} alt="mmoken" width={owda.width} />
      </div>
      <div className="paymentSlideItem">
        <Image blurDataURL={vodafon.blurDataURL} src={vodafon} alt="bank du cairo" width={vodafon.width} />
      </div>
      <div className="paymentSlideItem">
        <Image blurDataURL={aman.blurDataURL} src={aman} alt="aman" width={aman.width} />
      </div>
      {/* new payments by hamed */}

      <div className="paymentSlideItem" >
        <Image blurDataURL={bankAhly.blurDataURL} src={bankAhly} alt="Bank Ahly" width={bankAhly.width} />
      </div>

      <div className="paymentSlideItem">
        <Image blurDataURL={bankMasr.blurDataURL} src={bankMasr} alt="Bank Masr" width={bankMasr.width} />
      </div>
      <div className="paymentSlideItem">
        <Image blurDataURL={forsa.blurDataURL} src={forsa} alt="Bank Ahly" width={forsa.width} />
      </div>
      <div className="paymentSlideItem">
        <Image blurDataURL={Mashreq.blurDataURL} src={Mashreq} alt="Mashreq" width={Mashreq.width} />
      </div>

      <div className="paymentSlideItem">
        <Image blurDataURL={masterCard.blurDataURL} src={masterCard} alt="masterCard" width={masterCard.width} />
      </div>
      <div className="paymentSlideItem">
        <Image blurDataURL={Meeza.blurDataURL} src={Meeza} alt="Meeza" width={Meeza.width} />
      </div>
      <div className="paymentSlideItem">
        <Image blurDataURL={NBK.blurDataURL} src={NBK} alt="NBK" width={NBK.width} />
      </div>
      <div className="paymentSlideItem">
        <Image blurDataURL={valu.blurDataURL} src={valu} alt="valu" width={valu.width} />
      </div>
      <div className="paymentSlideItem">
        <Image blurDataURL={Shahry.blurDataURL} src={Shahry} alt="Shahry Egypt" width={Shahry.width} />
      </div>
    </div>
    </ParallaxSlider>
  );
};

export default PaymentSlider;
