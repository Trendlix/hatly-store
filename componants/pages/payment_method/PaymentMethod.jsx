import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import bankMisr from "../../../img/cairo.png";
import CIB from "../../../img/Cib_Logo.svg.png";
import Installments from "../../Installments";
import PaymentSlider from "../../PaymentSlider";

const PaymentMethod = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ backgroundColor: "#ebeef5", paddingTop: "150px" }}
      className="pb-5"
    >
      <div className="container pt-4">
        <div className="row">
          <Installments></Installments>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentMethod;
