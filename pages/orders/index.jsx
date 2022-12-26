import React from 'react';
import AccountLayout from '../../Layout/Account';

import style from './orders.module.css';
import Link from 'next/link';
import OrderOverview from '../../componants/OrderOverview/OrderOverview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarActions, sidebarState } from '../../redux/features/user/sidebarSlice';
import Overlay from '../../componants/Overlay.jsx/Overlay';

const index = () => {
  const dispatch = useDispatch()
  const {isOpened} = useSelector(sidebarState)
  const openSidebarHandler = () => {
    dispatch(sidebarActions.open())
  }
  return (
    <div className={style.pageContainer}>
      {isOpened ? <Overlay /> : null}
      <Link href="/shop/all" className={style.link} >
        <span className={style.backward}>{'<<'}</span>
        Back to shopping
      </Link>
      <div className={style.headerContainer}>
      <FontAwesomeIcon className={style.gearIcon} icon={faGear} onClick={openSidebarHandler}/>
      <h2 className={style.header}>Your Orders</h2>
      </div>
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

export async function getServerSideProps(context) {
  const token = context.req.cookies.access_token
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  return {
    props: {}, // will be passed to the page component as props
  }
}