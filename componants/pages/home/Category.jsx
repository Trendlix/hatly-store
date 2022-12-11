import { motion } from "framer-motion";
import React from "react";
import Link from 'next/link'
import Image from "next/image";

const Category = (props) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
        },
      }}
      className="col-4 col-md-4  mt-md-3 col-lg mt-lg-0 flex-grow-1 category mt-3 mt-md-0"
      style={{width : "100%" }}
    >
      <Link
        href={`/shop/${props.category.url}`}
        onClick={() => {
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
      >
        <div
          className="p-3 col-11 "
          style={{
            backgroundColor: "#384a8c",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <Image
          className="category_img_container"
            loading="lazy"
            src={props.category.img}
            alt="category"
            style={{
              width: "100%",
              WebkitFilter: "drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.5))",
              filter: "drop-shadow(0px 0px 40px white)",
            }}
          />
          <h6 className="pt-3 text-center text-white">{props.category.name}</h6>
        </div>
      </Link>
    </motion.div>
  );
};

export default Category;
