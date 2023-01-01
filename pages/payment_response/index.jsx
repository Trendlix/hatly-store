import React, { useEffect, useState } from "react";
// import { Link, useSearchParams } from "react-router-dom";
import card from "../../img/card.png";
import failed from "../../img/faild.png";
import loadingPic from "../../img/loading.gif";
import axios from "axios";
import { fetchProduct } from "../../API/product";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;
const PaymentResponse = ({ token }) => {
  console.log(token)
  const cart = useSelector((state) => state.cart);
  // const [searchParams, setSearchParams] = useSearchParams();
  const router = useRouter()
  const [orderID, setOrderID] = useState("");
  const [success, setSuccess] = useState(false);
  // const [transactionId, seTransactionId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // const token = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem("token") : '');
  const getTransactionById = async () => {
    console.log(router.query.success)
    setSuccess(router.query.success);
    const transactionId = router.query.id;
    console.log(transactionId)
    // if (transactionId == "") {
    // } else {
    if (router.query.success) {
      setTimeout(async () => {
      try {
        axios.defaults.withCredentials = false
        const res = await axios.get(
          `https://accept.paymob.com/api/acceptance/transactions/${transactionId}`,
          {
            headers: {
              authorization: token,
            },
          }
        )
        
        console.log(res)
        if(!res.data.success)
        throw new Error('Your payment credentials is incorrect please try again.')
        setOrderID(res.data.order.id);
        setMessage(res.data.data.txn_response_code);
        // fetchProduct
        // .put("/products/changeQuantity", {
        // items: cart.products,
        // })
        fetchProduct.post("/mail", {
          to: res.data.billing_data.email,
          name: `${res.data.billing_data.first_name} ${res.data.billing_data.last_name}`,
          items: res.data.order.items,
          orderID: res.data.order.id,
        });
      } catch (e) {
        setMessage(e.message)
      }
      setLoading(false)
      Cookies.remove('_pt_',{
        domain : '.trendlix.com',
      })
      }, 2000);
    }
  };
  useEffect(() => {
    // console.log()
    // if (router.query.success === 'false'){
    //   return
    // }
    getTransactionById();
  }, []);

  return (
    <div className="container" style={{ paddingTop: "150px" }}>
      {loading ? (
        <div className="row justify-content-center">
          <Image className="col-auto" width="100%" src={loadingPic} alt="loading" />
        </div>
      ) : (
        <div
          className="row align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <div
            className="col-11 p-4"
            align="center"
            style={{
              backgroundColor: "white",
              boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
              borderRadius: "5px",
            }}
          >
            <div className="row justify-content-center">
              <div className="col-6 col-md-3">
                {success != "false" ? (
                  <Image
                    width="80%"
                    src={card}
                    style={{
                      padding: "30px",
                      backgroundColor: "#20c997",
                      borderRadius: "20%",
                    }}
                    alt="card"
                  />
                ) : (
                  <Image width="100%" src={failed} alt="failed" />
                )}
              </div>
            </div>
            <div className="row">
              <h3 className="p-4">
                {success != "false"
                  ? "THANK YOU!"
                  : `${message}`}
              </h3>
              <p style={{ fontSize: "20px" }}>
                {success != "false"
                  ? `Payment done successfully your order ID is ${orderID}`
                  : ""}
              </p>
              <p style={{ fontSize: "20px" }}>
                {success != "false"
                  ? `Check your inbox please`
                  : ""}
              </p>
            </div>
            <div className="row justify-content-center">
              <Link
                onClick={() => {
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  });
                }}
                href="/checkout"
                className="btn col-6 col-md-2 mt-3 text-white"
                style={{ backgroundColor: "#20c997" }}
              >
                Go to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentResponse;

export async function getServerSideProps(context) {
  console.log(context.req.cookies)
  console.log('_____________________')
  const accessToken = context.req.cookies.access_token
  const paymentToken = context.req.cookies._pt_
  console.log(context.query)
  console.log('_____________________')
  // context.res.setHeader('Set-Cookie', '_pt_=""; Max-Age=0');
  console.log(paymentToken)
  console.log(accessToken)
  const successProps = {}
  if (paymentToken)
    successProps.token = paymentToken
  if (!accessToken || !paymentToken)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  return {
    props: successProps, // will be passed to the page component as props
  }
}