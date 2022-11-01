import React, { FC } from "react";

import underline from "../../assets/UnderlineBlack.svg";

const OurServices: FC = () => {
  return (
    <section className="bg-primary text-white lg:px-48 md:px-12 px-4 py-14 flex flex-col items-center">
      <div>
        <h2
          style={{ backgroundImage: `url(${underline})` }}
          className="font-pt-serif text-3xl bg-left-bottom bg-contain bg-no-repeat pb-8 px-16 mb-8 bg-underline2 bg-100%"
        >
          Our Services
        </h2>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 mx-8 flex flex-col items-center my-4">
          <div className="border-2 rounded-full bg-secondary text-black h-12 w-12 flex justify-center items-center mb-3">
            1
          </div>
          <h3 className="font-montserrat text-center text-nav_black font-medium text-xl mb-2 md:min-h-[56px]">
            Adventurers Experience
          </h3>
          <p className="text-center font-montserrat">
            We have a variety of adventures, from camping & hacking to desert
            hack & treasure hunt!
          </p>
        </div>
        <div className="flex-1 mx-8 flex flex-col items-center my-4">
          <div className="border-2 rounded-full bg-secondary text-black h-12 w-12 flex justify-center items-center mb-3">
            2
          </div>
          <h3 className="font-montserrat text-center text-nav_black font-medium text-xl mb-2 md:min-h-[56px]">
            Kids Experience
          </h3>
          <p className="text-center font-montserrat">
            The best place for your kids to have some fun!
          </p>
        </div>
        <div className="flex-1 mx-8 flex flex-col items-center my-4">
          <div className="border-2 rounded-full bg-secondary text-black h-12 w-12 flex justify-center items-center mb-3">
            3
          </div>
          <h3 className="font-montserrat text-center text-nav_black font-medium text-xl mb-2 md:min-h-[56px]">
            Festivals
          </h3>
          <p className="text-center font-montserrat">
            An amazing winter getaway tailored specially to entertain the whole
            family!
          </p>
        </div>
        <div className="flex-1 mx-8 flex flex-col items-center my-4">
          <div className="border-2 rounded-full bg-secondary text-black h-12 w-12 flex justify-center items-center mb-3">
            4
          </div>
          <h3 className="font-montserrat text-center text-nav_black font-medium text-xl mb-2 md:min-h-[56px]">
            SMEs Community
          </h3>
          <p className="text-center font-montserrat">
            Where you can learn, network, and teach!
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
