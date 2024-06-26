import React, { useEffect, useState } from "react";
// import { Link, useSearchParams } from "react-router-dom";
import card from "../../img/card.png";
import failed from "../../img/faild.png";
import loadingPic from "../../img/loading.gif";
import axios from "axios";
import { fetchProduct } from "../../API/product";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";
import { resetCart } from "../../redux/cartRedux";
import makeOrder from "../../utils/makeOrder";
axios.defaults.withCredentials = true;
const PaymentResponse = ({ token }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.user);
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
        if(router.query.success === 'false')
          throw new Error('Your payment credentials is incorrect please try again.')
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
        // if payment is failed throw error
        if(!res.data.success)
        throw new Error('Your payment credentials is incorrect please try again.')
        // if payment succeeded make order
        const billingData = {...res.data.billing_data}
        // make request with Credentials to true
        axios.defaults.withCredentials = true
        const order = await makeOrder({
          ...billingData,
          firstName : billingData.first_name,
          lastName : billingData.last_name,
          phone : billingData.phone_number
        },
        cart,
        'Paymob',
        transactionId
        )
        // remove cart after payment and order done
        dispatch(resetCart());
        localStorage.removeItem('cart');

        setOrderID(order.data.body.name)
        // setOrderID(res.data.order.id);
        setMessage(res.data.data.txn_response_code);
        // fetchProduct
        // .put("/products/changeQuantity", {
        // items: cart.products,
        // })
        // fetchProduct.post("/mail", {
        //   to: res.data.billing_data.email,
        //   name: `${user.firstName} ${user.lastName}`,
        //   items: res.data.order.items,
        //   orderID: res.data.order.id,
        // });
        
        
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
    <div className="container" style={{ paddingTop: "180px" }}>
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
                {success !== "false"
                  ? `Payment done successfully your order ID is ${orderID}`
                  : ""}
              </p>
              {/* <p style={{ fontSize: "20px" }}>
                {success != "false"
                  ? `Check your inbox please`
                  : ""}
              </p> */}
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
                href={success === "true" ? `/orders/${orderID}` : "Go to Checkout"}
                className="btn col-6 col-md-3 mt-3 text-white"
                style={{ backgroundColor: "#20c997" }}
              >
                {success === "true" ? "Check your order" : "Go to Checkout"}
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
  const transactionID = context.query.id;
  const transactionStatus = context.query.success;
  // context.res.setHeader('Set-Cookie', '_pt_=""; Max-Age=0');
  console.log(paymentToken)
  console.log('_____________________')
  console.log(accessToken)
  console.log('_____________________')
  console.log(transactionID)
  console.log('_____________________')
  console.log(transactionStatus)
  const successProps = {}
  if (paymentToken)
    successProps.token = paymentToken
  if (!accessToken || !paymentToken || !transactionID || !transactionStatus)
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