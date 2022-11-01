import React, { FC } from "react";

type propsType = {
  title: string;
  description: string;
  classes?: string;
};
const Box: FC<propsType> = (props) => {
  return (
    <div className={`flex flex-col  font-extrabold ${props.classes ?? ""}`}>
      <h3 className="text-lg ">{props.title}</h3>
      <p className="text-[#FFFFFF] ">{props.description}</p>
    </div>
  );
};

export default Box;
