import React from 'react';

import style from './OrderOverview.module.css';
import Image from 'next/image';
// import img from '../../img/image1-1536x1152.png'
import notFound from "../../img/notFound.png";
import useMobileDeviceDetection from '../../hooks/useMobileDetection';
const OrderOverview = ({ img, productName, productCategory, totalPrice }) => {
  const isMobile = useMobileDeviceDetection()
  return (
    <div className={style.componentContainer}>
      <div className={style.dataContainer}>
        <Image className={style.img} alt='product' src={img ?? notFound} width={100} height={100} />
        <div className={style.data}>
          <p className={style.productName}>
            {isMobile ?
              `${productName.slice(0, 15)} ${productName.length > 15 ? '...' : ''}` :
              `${productName.slice(0, 21)} ${productName.length > 21 ? '...' : ''}` 
            }
          </p>
          <p className={style.category}>{productCategory}</p>
        </div>
      </div>
      <div className={style.priceContainer}>
        <p className={style.price}>{parseFloat(totalPrice).toFixed(1)}</p>
        <button className={style.btn} type='button'>View Details</button>
      </div>
    </div>
  )
}

export default OrderOverview