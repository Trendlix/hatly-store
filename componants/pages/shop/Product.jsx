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
  console.log(props)
  return (
    <div className={props.grid}>
      <div>
        <Link href={`/product/${props.data?.item_code}`} onClick={scrollTop} style={{height : '100%', display : 'block', backgroundColor: "#8080803b" ,}}>
          <Image
            className="productImage"
            src={props.data?.image && props.data.image[0]?.length > 1 ? props.data?.image[0] : notFound}
            width={125}
            height={125}
            style={{ width: "100%", height: "100%" , mixBlendMode: "multiply" , aspectRatio : '1' , objectFit: "none"}}
            alt="product"
          />
        </Link>
        <p style={{margin : '0.5rem 0 '}}>{props.data?.name?.split(' ')[0]}</p>
        <Link href={`/product/${props.data?.item_code}`} onClick={scrollTop}>
          <p style={{margin : '0.5rem 0',textOverflow : 'ellipsis',maxWidth : '100%','whiteSpace' : 'nowrap' , overflow : 'hidden'}}>{props.data?.name}</p>
        </Link>
        {/* <p style={{ fontWeight: "500" }}>{`EGP ${parseInt(props.data?.price ? props.data.price : 0)}`}</p> */}
        <Link
          onClick={scrollTop}
          className="btn btn-primary"
          style={{ width: "100%" }}
          href={`/product/${props.data?.item_code}`}
        >
          <i className="fa fa-eye"></i> View
        </Link>
      </div>
    </div>
  );
};

export default Product;
