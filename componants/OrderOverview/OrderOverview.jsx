import React from 'react';

import style from './OrderOverview.module.css';
import Image from 'next/image';
import img from '../../img/image1-1536x1152.png'
const OrderOverview = () => {
  return (
    <div className={style.componentContainer}>
      <div className={style.dataContainer}>
        <Image className={style.img} alt='product' src={img} width={img.width} height={img.height} />
        <div className={style.data}>
          <p className={style.productName}>Apple Watch</p>
          <p className={style.category}>Smart watch</p>
        </div>
      </div>
      <div className={style.priceContainer}>
        <p className={style.price}>4500 LE</p>
      </div>
    </div>
  )
}

export default OrderOverview