import React from "react";
import {
  MDBCarousel,
  // MDBCarouselInner,
  MDBCarouselItem,
  // MDBCarouselElement,
} from "mdb-react-ui-kit";
import Link from 'next/link'
import Image from 'next/image'
export default function ImageSlider(props) {
  // console.log(props.img)
  // return (
  //   <MDBCarousel showControls interval={props.interval}>
  //     {/* <MDBCarouselInner> */}
  //       {props?.img?.map((img, i) => {
  //         if (i === 0) {
  //           return (
  //             <MDBCarouselItem className="active" key={i}>
  //               {/* <MDBCarouselElement  */}
  //                 {/* style={{ borderRadius: "15px" }} */}
  //                 className='w-100 d-block'
  //                 itemId={i+1}
  //                 src={img}
  //                 alt="..."
  //               {/* /> */}
  //             </MDBCarouselItem>
  //           );
  //         } else {
  //           return (
  //             <MDBCarouselItem key={i}>
  //               {/* <MDBCarouselElement */}
  //                 {/* style={{ borderRadius: "15px" }} */}
  //                 className='w-100 d-block'
  //                 src={img}
  //                 itemId={i+1}
  //                 alt="..."
  //                {/* /> */}
  //             </MDBCarouselItem>
  //           );
  //         }
  //       })}
  //     {/* </MDBCarouselInner> */}
  //   </MDBCarousel>
    
  // );
  console.log(props.img)
  return (
    <MDBCarousel showControls showIndicators>
      {props?.img?.map((el,i)=>{
        return(
          <Link href={el.link ?? '/'} key={i}>

        <MDBCarouselItem key={i}
        className='w-100 d-block'
        itemId={i+1}
        src={el.img.src}
        alt='...'
        />
        </Link>
        )
      })}
      {/* <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src='https://mdbootstrap.com/img/new/slides/042.jpg'
        alt='...'
      />
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src='https://mdbootstrap.com/img/new/slides/043.jpg'
        alt='...'
      /> */}
    </MDBCarousel>
  );
}
