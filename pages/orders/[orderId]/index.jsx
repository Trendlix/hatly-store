import React, { useEffect } from 'react';

import {motion} from 'framer-motion'
import style from './orderDetails.module.css';
import Link from 'next/link';
import OrderItem from '../../../componants/OrderItem/OrderItem';
import img from '../../../img/MacBook-Pro-2021.jpg'
import axios from 'axios';
import API_URL from '../../../API/ApiUrl';
import { useState } from 'react';

axios.defaults.withCredentials = true;
const index = ({ data }) => {
  // const getOrderHandler = async () => {
  //   const req = await axios.get(`${API_URL}/orders/${orderId}`)
  //   setOrder(req.data)
  //   console.log(req.data)
  // }
  // useEffect(() => {
  //   getOrderHandler()
  // }, []);
  const getDate = (date) => {
    const newDate = new Date(date)
    const day = newDate.getDay() + 1;
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`
  }
  console.log(data)
  return (
    <motion.div
      className={`${style.pageContainer} container`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Link href="/orders" className={style.link} >
        <span className={style.backward}>{'<<'}</span>
        Back to orders
      </Link>
      <div className={style.headerContainer}>
        <h2 className={style.header}>Order Details</h2>
      </div>
      <div className={style.mainOrderDetailsContainer}>
        {/* <div className={style.detailItem}> */}
        <p>Order Id:</p>
        <p>#{data.name}</p>
        <p>Date:</p>
        <p>{getDate(data.creation)}</p>
        <p>Delivery Status:</p>
        <p>{"Delivered"}</p>
        {/* </div> */}
      </div>
      <div className={style.orderItems}>
        {data.ordersItems.map(el =>
          <OrderItem
            key={el.name}
            name={el.item_name}
            category={el.item_group}
            price={parseFloat(el.base_amount).toFixed(1)}
            quantity={parseInt(el.qty)}
            image={`https://hatlystore.tswsp.net${el.image}`}
          />
        )
        }
      </div>
      <div className={style.informationContainer}>

        <div className={style.contactInformation}>
          <h4 className={style.sectionHeader}>Contact Information</h4>
          <div className={style.gridContainer}>
            <p className={style.dataHeader}>Name</p>
            <p className={style.data}>{data.contact_display}</p>
            <p className={style.dataHeader}>Phone Number</p>
            <p className={style.data}>{data.contact_mobile}</p>
          </div>
        </div>
        <div className={style.deliveryAddress}>
          <h4 className={style.sectionHeader}>Delivery Address</h4>
          <div className={style.gridContainer}>
            <p className={style.dataHeader}>State</p>
            <p className={style.data}>{data.state}</p>
            <p className={style.dataHeader}>City</p>
            <p className={style.data}>{data.city}</p>
            <p className={style.dataHeader}>Street</p>
            <p className={style.data}>{data.street}</p>
            <p className={style.dataHeader}>Building</p>
            <p className={style.data}>{data.building}</p>
            <p className={style.dataHeader}>Floor</p>
            <p className={style.data}>{data.floor}</p>
            <p className={style.dataHeader}>Apartment</p>
            <p className={style.data}>{data.apartment}</p>
            {
              data.extraDescription &&
              <p className={style.dataHeader}>Extra Description</p>
            }
            {
              data.extraDescription &&
              <p className={style.data}>{data.extraDescription}</p>
            }
          </div>
        </div>
        <div className={style.orderInfo}>
          <div className={style.priceContainer}>
            <h4 className={style.sectionHeader}>Order Info</h4>
            <div className={style.priceGridContainer}>
              <p className={style.priceTitle}>Sub Total</p>
              <p className={style.price}>{parseFloat(data.total).toFixed(1)}</p>
              <p className={`${style.priceTitle} ${style.underline}`}>Delivery Fees</p>
              <p className={style.price}>{parseInt(data.total_taxes_and_charges)}</p>
              <p className={style.priceTitle}>Total:</p>
              <p className={style.price}>{parseFloat(data.grand_total).toFixed(1)}</p>
            </div>
          </div>
        </div>
        <h4 className={style.sectionHeader}>Payment Method</h4>
        <p className={style.paymentMethod}>{data.paymentMethod}</p>
      </div>
    </motion.div>
  )
}



export default index

export async function getServerSideProps(context) {

  try {
    const { orderId } = context.params
    const req = await axios.get(`${API_URL}/orders/${orderId}`, {
      headers: {
        Cookie: context.req.headers.cookie
      }
    })
    return {
      props: {
        data: req.data.data
      }, // will be passed to the page component as props
    }
  } catch (e) {
    console.log(e)
    return {
      redirect: {
        destination: "/orders",
        permanent: false,
      },
      props: {},
    };
  }

}