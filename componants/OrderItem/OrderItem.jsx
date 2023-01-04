import React from 'react';

import style from './OrderItem.module.css'
import Image from 'next/image';
const OrderItem = ({ image, name, category, price, quantity }) => {
  return (
    <div className={style.componentContainer}>
      <div className={style.imgContainer}>
        <Image
          src={image}
          alt="product"
          width={200}
          height={200}
        />
      </div>
      <div className="dataContainer">
        <p className={style.ItemName}>{name}</p>
        <p>{category}</p>
        <div className={style.girdContainer}>
          <p className={style.gridHead}>Price</p>
          <p>{price}</p>
          <p className={style.gridHead}>Quantity</p>
          <p>{quantity}</p>
        </div>
      </div>
    </div>

  )
}

export default OrderItem