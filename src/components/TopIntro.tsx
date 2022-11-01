import React, { FC } from "react";

import BackDrop1 from "../assets/backdrop-home-1.png";

const TopIntro: FC = () => {
  return (
    <div className="relative">
      <div className="intro__text absolute left-1/2 max-lg:left-[5%] top-8">
        <h1 className="font-black text-5xl lg:text-7xl">
          Let's Get
          <br />
          <span className="pl-20">Connected</span>
        </h1>
        <div className="intro__description text-center px-12 pt-4 pb-2 font-semibold">
          <p>
            In waves seasons we design an amazing getaway for our audience to
            become the most anticipated destination for them and their families
            to create memorable moments
          </p>
        </div>
        <div className="flex justify-center">
          <span className="read__more_btn inline-block">
            <button type="button" className="bg-primary px-4 py-1 ">
              Read More
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopIntro;
