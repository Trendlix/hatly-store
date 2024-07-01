import React, { useEffect, useState } from 'react';
import AccountLayout from '../../Layout/Account';

import { motion } from 'framer-motion';
import style from './orders.module.css';
import Link from 'next/link';
import OrderOverview from '../../componants/OrderOverview/OrderOverview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarActions, sidebarState } from '../../redux/features/user/sidebarSlice';
import Overlay from '../../componants/Overlay.jsx/Overlay';
import dashboardAnimation from '../../utils/dashboardAnimation';
import axios from 'axios';
import API_URL from '../../API/ApiUrl';
import LoadingOverlay from '../../componants/LoadingOverlay/LoadingOverlay';
import { userState } from '../../redux/features/user/userSlice';

axios.defaults.withCredentials = true;
const scrollTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
const index = () => {
  const dispatch = useDispatch()
  // const userState = useSelector(state => state.user)
  const { isOpened } = useSelector(sidebarState)
  const [products, setProducts] = useState([])
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const getOrdersHandler = async () => {
    setLoading(true)
    const res = await axios.get(`${API_URL}/orders/${userState.user._id}`)
    const { totalLength, data } = res.data
    setProducts(data)
    console.log(data)
    if (totalLength !== pages.length)
      setPages(prev => Array.from({ length: Math.ceil(totalLength / 4) }, (_, i) => i + 1))
    setLoading(false)
    // console.log(res.data)
    // return res.data
  }
  console.log(currentPage)
  useEffect(() => {
    getOrdersHandler();
  }, [currentPage]);
  const openSidebarHandler = () => {
    dispatch(sidebarActions.open())
  }
  console.log(products)
  return (
    <motion.div
      className={style.pageContainer}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={dashboardAnimation.variants}
      transition={dashboardAnimation.transition}
    >
      {isOpened ? <Overlay /> : null}
      {loading && <LoadingOverlay />}
      <Link href="/shop/all" className={style.link} >
        <span className={style.backward}>{'<<'}</span>
        Back to shopping
      </Link>
      <div className={style.headerContainer}>
        <FontAwesomeIcon className={style.gearIcon} icon={faGear} onClick={openSidebarHandler} />
        <h2 className={style.header}>Your Orders</h2>
      </div>
      <div className={style.optionsContainer}>
        <div className={style.options}>
          {/* <span className={style.option}>Orders</span> */}
          {/* <span className={style.option}>Returns</span> */}
        </div>
        <Link className={`${style.link} ${style.help}`} href="/contact">Need Help</Link>
      </div>
      {
          products.length === 0 && loading === false ?
          <p>You haven\'t placed any orders yet!</p>
          :
          <div className={style.orders}>
            
            {products?.map(el =>
            { console.log(el, 'element in loop of products')
             return ( el.products.map((productItem)=>{
                console.log(productItem)
                return (
                <OrderOverview
                  key={productItem.product.item_code}
                  img={productItem.product.image[0]}
                  productName={productItem.product.item_name}
                  productCategory={productItem.product.item_group}
                  totalPrice={productItem.product.price * productItem.quantity}
                  orderId={el._id}
                />
                )
              }))
            
            })}
          </div>
        }
      <div aria-label="Page navigation example m-2 ">
        <ul className="pagination float-end">
          {pages.map((number) => {
            return (
              <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
                <p
                  className="page-link"
                  value={number}
                  onClick={(e) => {
                    const page = e.target.getAttribute("value");
                    setCurrentPage(+page)
                    scrollTop()
                  }}
                >
                  {number}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
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