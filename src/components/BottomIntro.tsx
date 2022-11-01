import React, { FC } from "react";
import Box from "./Box";

const BottomIntro: FC = () => {
  return (
    <div className=" flex relative h-full">
      <div className="md:absolute left-1/2 grid grid-cols-2 gap-x-4 content-center md:pr-1 h-full max-md:px-4">
        {/* <div className="grid grid-cols-2 gap-x-2"> */}
        <Box
          title="10 +"
          description="OUTSTANDING ENTERTAINMENT EVENTS TO BE HELD"
        />
        <Box title="20 +" description="TOP BRANDS COLLABORATIONS" />
        <Box title="5 +" description="YEARS OF EVENTS FIELD EXPERIENCE" />
        <Box title="20 +" description="PARTNERSHIP" />
        {/* </div> */}
      </div>
    </div>
  );
};

export default BottomIntro;
