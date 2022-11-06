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
      <img width={36} height={36} src={props.icon} alt="icon"/>
      <h3 className="text-lg ">{props.title}</h3>
      {/* <p className="text-[#FFFFFF] ">{props.description}</p> */}
    </div>
  );
};

export default Box;
