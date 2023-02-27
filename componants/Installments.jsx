// import { border } from "@mui/system";
import React from "react";
import CIB from "../img/Cib_Logo.svg.png";
import Cairo from "../img/cairo.png";
import masary from "../img/Masary.png";
import momkn from "../img/Momkn-Egypt-22716-1487193965-og.png";
import saib from "../img/Saib bank.png";
import owda from "../img/oda.png";
import vodafon from "../img/Vodafone-Logo.png";

import aman from "../img/HATLY NEW PAYMENTS METHODS/Aman.png";
import bankAhly from "../img/HATLY NEW PAYMENTS METHODS/Bank-ElAhly.png";
import bankMasr from "../img/HATLY NEW PAYMENTS METHODS/Bank-Masr.png";
import forsa from "../img/HATLY NEW PAYMENTS METHODS/forsa.png";
import Mashreq from "../img/HATLY NEW PAYMENTS METHODS/Mashreq.png";
import masterCard from "../img/HATLY NEW PAYMENTS METHODS/masterCard.png";
import Meeza from "../img/HATLY NEW PAYMENTS METHODS/Meeza.png";
import NBK from "../img/HATLY NEW PAYMENTS METHODS/NBK.png";
import valu from "../img/HATLY NEW PAYMENTS METHODS/valu.png";
import Shahry from "../img/HATLY NEW PAYMENTS METHODS/Shahry-Egypt.png";
import Image from "next/image";


const data = [
  {
    img: bankMasr,
    name: "Banque Misr",
    des: "Salary Guarantee,Certificates Guarantee,Bank Deposit Guarantee,Debit Account Guarantee,Club membership Guarantee",
    extreDes:
      "For more details, please contact 19888",
      months: 36,
  },
  {
    img: Cairo,
    name: "Banque de Caire",
    des: "Salary Guarantee,Certificates Guarantee,Bank Deposit Guarantee,Debit Account Guarantee,Club membership Guarantee",
    extreDes:
      "For more details, please contact 16990",
      months: 36,
  },


  {
    img: NBK,
    name: "NBK",
    des: "Salary vocabulary guarantee,Certificate Guarantee,Guaranteed deposit,Guaranteed savings account,Guaranteed club subscriptions",
    extreDes:
      "For more details, please contact 19336",
      months: 36,
  },

  {
    img: CIB,
    name: "CIB",
    des: "Salary vocabulary guarantee,Certificate Guarantee,Guaranteed deposit,Guaranteed savings account,Guaranteed club subscriptions",
    extreDes:
      "For more details, please contact 19666",
      months: 36,
  },

  {
    img: bankAhly,
    name: "National bank of Egypt",
    des: "Salary vocabulary guarantee,Certificate Guarantee,Guaranteed deposit,Guaranteed savings account,Guaranteed club subscriptions",
    extreDes:
      "For more details, please contact 19623",
      months: 36,
  },


  {
    img: forsa,
    name: "Forsa",
    des: "Current ID Card,Car License,Credit Card from Egyptian banks,Club Membership",
    extreDes:
      "For more details, please contact 16845",
      months: 60,
  },


  {
    img: Shahry,
    name: "Shahry",
    des: "Current ID Card,Car License,Credit Card from Egyptian banks,Club Membership",
    extreDes:
      "For more details, please contact 15979",
      months: 60,
  },


  {
    img: aman,
    name: "Aman",
    des: "Current ID Card,Car License,Credit Card from Egyptian banks,Club Membership",
    extreDes:
      "For more details, please contact 19910",
      months: 60,
  },
  {
    img: valu,
    name: "Valu",
    des: "Current ID Card,Car License,Credit Card from Egyptian banks,Club Membership",
    extreDes:
      "For more details, please contact 16671",
      months: 60,
  },

];

const Installments = () => {
  return data.map((el, i) => {
    console.log(3 % 2);
    return (
      <div
      style={{background:'conic-gradient(from 90deg  at top   left  var(--b),var(--_g)) 0    0    / var(--_p),'}}
        key={i}
        className={`row align-items-center justify-content-center ${
          (i + 1) % 2 !== 0 ? "flex-row-reverse" : ""
        }  `}
      >
        <div className="col-11 col-md-6 d-flex justify-content-center">
        <Image src={el.img} alt="" width={el.img.width} height={el.img.height} style={{objectFit : 'none'}}/>
        </div>
        <div className="col-11 col-md-6 p-5">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              borderRadius: "50%",
              border: "3px solid #384a8c",
              height: "50px",
              width: "50px",
            }}
          >
            <span>{i + 1}</span>
          </div>
          <h1 className="mt-5">{el.name}</h1>
          <p>
            Buy everything you need through Hatley and {el.name}, through the
            Banque Misr purchase card, and installments up to {el.months} months...
          </p>
          {/* <p>A purchase card can be obtained for all Banque Misr customers.</p> */}
          <ol>
            {el.des.split(",").map((el, i) => {
              return <li key={i}>{el}</li>;
            })}
          </ol>
          <p>{el.extreDes}</p>
        </div>
      </div>
    );
  });
};

export default Installments;
