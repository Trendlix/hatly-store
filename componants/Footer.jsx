import React from "react";
import Link from 'next/link'
// import appStore from "../img/appstore.png";
import playStore from "../img/play-srore.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(180deg, #ebeef5, #384a8c)",
      }}
    >
      <div className="container pt-5">
        <div className="row justify-content-center pt-md-5 pt-0 pb-5">
        <div className="d-flex justify-content-around col-12 col-md-6">
          <div className="">
            <h4> Categories</h4>
            <ul style={{ padding: "0" }}>
              <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/shop/Mobiles"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Phones
                </Link>
              </li>
              <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/shop/Mobiles"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Smart Watches
                </Link>
              </li>
              <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/shop/Mobiles"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Chargers
                </Link>
              </li>
              <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/shop/Mobiles"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Headphones
                </Link>
              </li>
              <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/shop/Accessories"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Accessories
                </Link>
              </li>
              {/* <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/shop/Mobiles"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Cases
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="">
            <h4>Links</h4>
            <ul style={{ padding: "0" }}>
              <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/about"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  About Us
                </Link>
              </li>
              <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/contact"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Contact Us
                </Link>
              </li>
              <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/shop/all"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Shop
                </Link>
              </li>
              <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/policy"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Our Policy
                </Link>
              </li>
              {/* <li className="pt-1 " style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/our_store"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Our Store
                </Link>
              </li> */}
            </ul>
          </div>
          </div>

          <div className="col-12 col-md-3">
            <h4>Contact Us</h4>
            <ul style={{ padding: "0" }}>
              <li className="pt-1 " style={{ listStyle: "none" }}>
                <a
                  style={{
                    textDecoration: "none",
                    color: "#ebeef5",
                    fontWeight: "500",
                  }}
                  href="#1"
                  
                >
                </a>
              </li>
              <li className="pt-1" style={{ listStyle: "none" }}>
                <a href="mailto:hatlystore@gmail.com" className="text-white">hatlystore@gmail.com</a>
              </li>
            </ul>
            <div style={{ display: "flex" }}>
              <a href="https://www.facebook.com/hatly.store/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon
                  style={{ fontSize: "30px", color: "#ebeef5" }}
                  className="p-3 fa fa-facebook"
                  aria-hidden="true"
                  icon={faFacebook}
                ></FontAwesomeIcon>
              </a>
              <a href="https://www.instagram.com/hatlystores/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon
                  style={{ fontSize: "30px", color: "#ebeef5" }}
                  className="p-3 fa fa-instagram"
                  aria-hidden="true"
                  icon={faInstagram}
                ></FontAwesomeIcon>
              </a>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10">
            <p
              style={{ textAlign: "center", color: "white", fontSize: "13px" }}
            >
              Hatly is brought to you by Tradeline, the leading Apple Reseller
              in the region. The products categories it is bringing to the
              market comprise of handsets, audio, laptops, wearables, gaming
              consoles and accessories. Hatly is online and in store.
            </p>
            <p style={{ textAlign: "center", color: "white" }}>
              Copyright © {new Date().getFullYear()} Hatly All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
