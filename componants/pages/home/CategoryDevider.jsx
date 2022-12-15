import React from "react";
import Link from 'next/link'
import Image from "next/image";

const CategoryDevider = (props) => {
  console.log(props)
  return (
    <Link onClick={() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }} href={`/shop/${props.url}`}>
      <section className="container mb-4">
        <Image src={props.img} alt="banner" width={props.img.width} height={props.img.width} blurDataURL={props.img.blurDataURL} className="img" />
        {/* <h1 className="text-center" style={{ color: "white" }}>
            {props.name}
          </h1> */}
      </section>
    </Link>
  );
};

export default CategoryDevider;
