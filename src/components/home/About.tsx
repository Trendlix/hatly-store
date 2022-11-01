import React, { FC } from "react";

import underline from "../../assets/UnderlineBlack.svg";
const About: FC = () => {
  return (
    <section className="lg:px-48 md:px-12 px-4 py-14 flex flex-col items-center bg-secondary">
      <div>
        <h2
          style={{ backgroundImage: `url(${underline})` }}
          className="font-pt-serif text-3xl bg-left-bottom bg-contain bg-no-repeat pb-8 px-16 mb-8 bg-100%"
        >
          About us
        </h2>
      </div>
      <div className="md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-4">
        <div className="flex items-start font-montserrat mb-6 p-4 rounded-[1rem] border-primary border-solid border-[3px] hover:scale-[1.05] duration-150">
          <img src="dist/assets/logos/Heart.svg" alt="" className="h-7 mr-4" />
          <div>
            <h3 className="font-semibold text-2xl">About Waves #1</h3>
            <p className="text-[#777]">
              In Waves Seasons we design an amazing getaway for our audience to
              become the most anticipated destination for them and their
              families to create memorable moments and live the best experience
              ever that could be tailored specially for them. Every season of
              our journey will carry a new surprising story behind it.
            </p>
          </div>
        </div>
        <div className="flex items-start font-montserrat mb-6 p-4 rounded-[1rem] border-primary border-solid border-[3px] hover:scale-[1.05] duration-150">
          <img src="dist/assets/logos/Heart.svg" alt="" className="h-7 mr-4" />
          <div>
            <h3 className="font-semibold text-2xl">Vision #2</h3>
            <p className="text-[#777]">
              To become one of the most sought out seasonal events in Dubai
            </p>
          </div>
        </div>
        <div className="flex items-start font-montserrat mb-6 p-4 rounded-[1rem] border-primary border-solid border-[3px] hover:scale-[1.05] duration-150">
          <img src="dist/assets/logos/Heart.svg" alt="" className="h-7 mr-4" />
          <div>
            <h3 className="font-semibold text-2xl">Mission #3</h3>
            <p className="text-[#777]">
              To offer our clients an amazing experience that will create
              memorable moments at the best gathering destination in Dubai
            </p>
          </div>
        </div>
        <div className="flex items-start font-montserrat mb-6 p-4 rounded-[1rem] border-primary border-solid border-[3px] hover:scale-[1.05] duration-150">
          <img src="dist/assets/logos/Heart.svg" alt="" className="h-7 mr-4" />
          <div>
            <h3 className="font-semibold text-2xl">The Story #4</h3>
            <p className="text-[#777]">
              We live in an era that is fast paced and changes in trends happen
              on a daily basis. What's the next big thing is always the most
              asked question! We created a concept that will have the answer, so
              join us and lets all ride the trendy “WAVES”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
