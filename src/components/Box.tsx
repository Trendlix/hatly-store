import React, { FC } from "react";

type propsType = {
  title: string,
  description: string,
  classes?: string,
  icon ?: any
};
const Box: FC<propsType> = (props) => {
  return (
    <div className={`flex items-center gap-2 cursor-pointer font-bold ${props.classes ?? ""}`}>
      <img className="w-12 h-12 max-sm:w-8 max-sm:h-8" src={props.icon} alt="icon"/>
      <h3 className="text-2xl max-sm:text-lg max-lg:text-xl ">{props.title}</h3>
      {/* <p className="text-[#FFFFFF] ">{props.description}</p> */}
    </div>
  );
};

export default Box;
