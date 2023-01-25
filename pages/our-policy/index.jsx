import React from 'react';
import Image from "next/image";

import style from './style.module.css';
import PolicyItem from '../../componants/PolicyItem/PolicyItem';
import img from '../../img/our-policy-banners.png'
const index = () => {
  return (
    <div className={`container ${style.pageContainer}`}>
      <h1 className={style.title}>Our Policy</h1>
      <Image 
      src={img}
      alt="Our-Policy"
      className={style.img}
      />
      <PolicyItem 
      title="Warranty:"
      description="We give you a 3 months warranty on smartphones and a 1-month warranty on smart gadgets against manufacturer defects in hardware parts, not software issues, if any hardware issue appeared during these periods the item will be replaced or you can ask for a full refund."
      />
      <PolicyItem 
      title="Returns:"
      description="Returns are accepted during the first 14 days from receiving the order but the item must be in factory condition, sealed and not opened or used."
      />
      <PolicyItem 
      title="Maintenance:"
      description="We won't leave you alone, if any issue appeared in your smartphone after the warranty period we offer you spare parts and maintenance with high quality and original spare parts."
      />
    </div>
  )
}

export default index