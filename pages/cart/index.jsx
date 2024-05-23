import React from "react";
import EmptyCart from "./EmptyCart";
import FilledCart from "../../componants/pages/cart/FilledCart";
import { useSelector } from "react-redux";
import sliderImage5 from "../../img/slider2.jpg";
import { motion } from "framer-motion";
import Image from "next/image";


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className=" pb-5"
      style={{ backgroundColor: "#ebeef5", paddingTop: "180px" }}
    >
      <div className="container">
        {cart.products.length ? (
          <FilledCart data={cart}></FilledCart>
        ) : (
          <EmptyCart></EmptyCart>
        )}
        <div className="row mt-3" >
          <div className="col-12 ps-0 pe-0">
            <Image src={sliderImage5} alt="slider" width="100%" />
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Cart;
