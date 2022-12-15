import React from "react";
// import {
// MDBCarousel,
// MDBCarouselInner,
// MDBCarouselItem,
// MDBCarouselElement,
// } from "mdb-react-ui-kit";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import Link from 'next/link'
import "swiper/css";
import "swiper/css/navigation";
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
  // console.log(props.img)
  return (
    // <div className="slider">
    <Swiper
      navigation={true}
      loop={true}
      speed={1000}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
      className="mySwiper" 
      >
      {
        props?.img?.map((el, i) => {
          return (
            <SwiperSlide key={i}>
              <Link href={el.link ?? ''} >
                <Image
                  src={el.img.src}
                  alt="slider"
                  width={el.img.width}
                  height={el.img.height}
                  blurDataURL={el.img.blurDataURL}
                />
              </Link>
            </SwiperSlide>
          )
        })}
    </Swiper>
    // </div>
  )
  //       <Link href={el.link ?? '/'} key={i}>
  //     <MDBCarouselItem key={i}
  //     className='w-100 d-block'
  //     itemId={i+1}
  //     src={el.img.src}
  //     alt='...'
  //     />
  //     </Link>
}
