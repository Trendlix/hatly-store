import React from 'react';
import AccountLayout from '../../Layout/Account';

import style from './orders.module.css';
import Link from 'next/link';
import OrderOverview from '../../componants/OrderOverview/OrderOverview';

const index = () => {
  return (
    <div className={style.pageContainer}>
      <Link href="/shop/all" className={style.link} >
        <span className={style.backward}>{'<<'}</span>
        Back to shopping
      </Link>
      <h2 className={style.header}>Your Orders</h2>
      <div className={style.optionsContainer}>
        <div className={style.options}>
          <span className={style.option}>Orders</span>
          <span className={style.option}>Returns</span>
        </div>
        <Link className={`${style.link} ${style.help}`} href="/contact">Need Help</Link>
      </div>
      <div className={style.orders}>
        <OrderOverview />
        <OrderOverview />
        <OrderOverview />
        <OrderOverview />
      </div>
    </div>
  )
}
index.PageLayout = AccountLayout;

export default index