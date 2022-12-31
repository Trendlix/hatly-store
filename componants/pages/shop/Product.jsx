import React from "react";
import Link from 'next/link'
import notFound from "../../../img/notFound.png";
import Image from "next/image";

const pStyle = {
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "-webkit-box",
  whiteSpace: "normal",
  overflow: "hidden",
};

const scrollTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const Product = (props) => {
  return (
    <div className={props.grid}>
      <div>
        <Link href={`/product/${props.data.id}`} onClick={scrollTop}>
          <Image
            className="productImage"
            src={props.data.image ? `https://hatlystore.tswsp.net${props.data.image}` : notFound}
            width={100}
            height={100}
            style={{ width: "100%", height: "100%" }}
            alt="product"
          />
        </Link>
        <Link href={`/product/${props.data.id}`} onClick={scrollTop}>
          <p style={pStyle}>{props.data.item_name}</p>
        </Link>

        <p style={{ fontWeight: "500" }}>{`EGP ${parseInt(props?.data?.price_list_rate)}`}</p>
        <Link
          onClick={scrollTop}
          className="btn btn-primary"
          style={{ width: "100%" }}
          href={`/product/${props.data.id}`}
        >
          <i className="fa fa-eye"></i> View
        </Link>
      </div>
    </div>
  );
};

export default Product;
