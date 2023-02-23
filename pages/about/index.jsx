import { motion } from "framer-motion";
import React, { useState } from "react";
import Iframe from "react-iframe";
import Link from 'next/link'
import hatly from "../../img/01.jpg";
import video from "../../img/video.mp4";
import PaymentSlider from "../../componants/PaymentSlider";
import Head from "next/head";
const AboutUs = () => {
  // const [isVideoOpened , setIsVideoOpened] = useState(false);
  // const openYoutubeIframe = ()=>{
  //   setIsVideoOpened(prev => true)
  // }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }} style={{ backgroundColor: "#ebeef5", paddingTop: '180px' }} className="pb-5">
      <Head>
        <title>Hatly | Best Online Shopping Website for Phones, Chargers, Smart watches, Headphones, Powerbanks, Cases & More!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container pt-4">
        <div className="row">
          <div
            className="col-12 p-4"
            style={{
              backgroundColor: "white",
              boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
              borderRadius: "5px",
            }}
          >
            <h1 className="pb-4 pt-4 text-center">ABOUT US</h1>
            <div className="row">
              <div className="col-12 col-md-6 p-3">
                <video src={video} style={{ width: "100%" }} controls></video>
                {/* <Iframe 
                url="https://www.youtube.com/embed/E04CJ9NQrKw"
                allowtransparency="false"
                height="100%"
                width="100%"
                /> */}
                {/* <img width="100%" src={hatly} alt="hatly store" /> */}
              </div>
              <div
                className="col-12 col-md-6 p-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-evenly",
                }}
              >
                <div className="">
                  <h4>ABOUT US</h4>
                  <p className="description">
                  Hatly store is one of the biggest stores in Egypt that afford the best flagship and leading smartphones from all brands, it was founded in 2014 until now by a group of ambitious friends to make it easier for you to own any smartphone you want even if it's not available in Egypt.
                  </p>
                </div>
                <div className="">
                  <h4>THE STORY</h4>
                  <p className="description">
                    Hatly Stores was established in 2014 to make it easier for buyers from Egypt to shop abroad safely with cash on delivery payment method.
                  </p>
                  <p className="description">
                    We are a bunch of passionate experts in different fields who decided to gather our efforts to bring you the best of products shipped from abroad.
                  </p>
                </div>

                <Link onClick={() => {
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  });
                }}
                  href="/shop/all"
                  className="btn btn-primary p-2 col-6 col-md-5 col-lg-3"
                >
                  <i className="fa fa-shopping-bag pe-1" aria-hidden="true"> </i> SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-12 p-4"
            style={{
              backgroundColor: "white",
              boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
              borderRadius: "5px",
            }}
          >
            <div className="row ">
              <div className="col-6 col-md-3">
                <i
                  className="fa fa-car mb-2"
                  style={{ color: "#001c46", fontSize: "50px" }}
                ></i>
                <h5>Quick Delivery</h5>
                <p className="description" style={{ width: "90%" }}>
                  Home delivery within 24hr of placing your order
                </p>
              </div>
              <div className="col-6 col-md-3">
                <i
                  className="fa fa-cc-mastercard mb-2"
                  style={{ color: "#001c46", fontSize: "50px" }}
                ></i>
                <h5>Payment Methods</h5>
                <p className="description" style={{ width: "90%" }}>
                  Cash On Delivery, Credit Card, Premium Card,
                  <Link href="/payment-methods">Installment</Link>
                </p>
              </div>
              <div className="col-6 col-md-3">
                <i
                  className="fa fa-check-circle-o mb-2"
                  style={{ color: "#001c46", fontSize: "50px" }}
                ></i>
                <h5>Quality</h5>
                <p className="description" style={{ width: "90%" }}>
                  Anything you buy from hatlystore.com has an Agent Warranty
                </p>
              </div>
              <div className="col-6 col-md-3">
                <i
                  className="fa fa-retweet mb-2"
                  style={{ color: "#001c46", fontSize: "50px" }}
                ></i>
                <h5>Return & Refund</h5>
                <p className="description" style={{ width: "90%" }}>
                  Enjoy 14 days Return Or Refund on all your purchases
                </p>
              </div>
            </div>
            <PaymentSlider number={3}></PaymentSlider>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
