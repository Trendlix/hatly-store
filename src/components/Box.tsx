import React, { FC } from "react";

type propsType = {
  title: string,
  description: string,
  classes?: string,
  icon ?: any
};
const Box: FC<propsType> = (props) => {
  return (
    <div className={`flex items-center cursor-pointer font-bold ${props.classes ?? ""}`}>
      {/* <img className="w-12 h-12 max-sm:w-8 max-sm:h-8" src={props.icon} alt="icon"/> */}
      <h3 className="text-sm bg-white rounded-[0.375rem] py-2 px-3 max-sm:text-sm max-lg:text-xl
                      max-md:w-full max-md:text-center">{props.title}</h3>
      {/* <p className="text-[#FFFFFF] ">{props.description}</p> */}
    </div>
  );
};

export default Box;
