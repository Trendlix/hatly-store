import React, { FC } from "react";
import Box from "./Box";
import festivals from '../assets/icons/festivals.svg'
import kids from '../assets/icons/kids experince.svg'
import sme from '../assets/icons/SME Community.svg'
import target from '../assets/icons/target.svg'

const BottomIntro: FC = () => {
  return (
    <div className=" flex justify-center flex-col relative h-full">
      <h2 className="md:hidden text-3xl text-center pt-6 font-extrabold">Our Services</h2>
      <div className="md:absolute left-1/2 right-0 grid grid-cols-2 gap-x-8
                      -mt-[3rem] max-sm:gap-x-2 gap-y-8 content-center md:pr-1 
                      h-full max-md:px-4 max-md:flex max-md:flex-col max-md:justify-center
                      max-md:items-stretch max-md:m-0"
                      >
        {/* <div className="grid grid-cols-2 gap-x-4 gap-y-4"> */}
        <Box
          title="Adventurers Experience"
          description="OUTSTANDING ENTERTAINMENT EVENTS TO BE HELD
          "
          icon={target}
        />
        <Box title="Kids Experience"
        description="TOP BRANDS COLLABORATIONS" 
        icon={kids}
        />
        <Box title="Festivals"
        description="YEARS OF EVENTS FIELD EXPERIENCE" 
        icon={festivals}
        />
        <Box title="SMEs Community"
        description="PARTNERSHIP" 
        icon={sme}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default BottomIntro;
