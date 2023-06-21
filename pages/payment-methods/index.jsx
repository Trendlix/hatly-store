import { motion } from "framer-motion";
import React from "react";
import Installments from "../../componants/Installments";
import video from "../../img/video.mp4";

const PaymentMethod = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ backgroundColor: "#ebeef5", paddingTop: "180px" }}
      className="pb-5"
    >
      <div className="container pt-4">
        <div className="row">
        <video src={video} style={{ width: "100%" }} controls></video>
        </div>
        <div className="row">
          <Installments></Installments>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentMethod;
