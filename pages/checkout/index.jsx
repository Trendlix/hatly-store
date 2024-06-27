import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { useForm } from "react-hook-form";
import notFound from "../../img/notFound.png";
import sliderImage5 from "../../img/slider4.jpg";
import { motion } from "framer-motion";
import PaymentSlider from "../../componants/PaymentSlider";

import cashImage from "../../img/Cash-on-delivery.png";
import cardImage from "../../img/Credit-Card.png";
import instalmentImage from "../../img/Bank-Installments.png";
import { useRouter } from "next/router";
import Image from "next/image";
import API_URL from "../../API/ApiUrl";
import { getUser, userActions, userState } from "../../redux/features/user/userSlice";
import Cookies from "js-cookie";
import makeOrder from "../../utils/makeOrder";
import LoadingOverlay from "../../componants/LoadingOverlay/LoadingOverlay";
import { toast } from "react-toastify";
import { resetCart } from "../../redux/cartRedux";

axios.defaults.withCredentials = true;

const pStyle = {
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "-webkit-box",
  whiteSpace: "normal",
  overflow: "hidden",
  margin: "0",
};

const Checkout = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { user } = useSelector(userState);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user)
      dispatch(getUser())
      setValue('firstName', user?.firstName)
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setValue('firstName', user?.firstName)
      setValue('lastName', user?.lastName)
      setValue('email', user?.email)
      setValue('phone', user?.phone)
      setValue('country', user?.country)
      setValue('street', user?.street)
      setValue('city', user?.city)
      setValue('building', user?.building)
      setValue('apartment', user?.apartment)
      setValue('floor', user?.floor)
    }
  }, [user]);

  const [items, setItems] = useState([]);

  const cart = useSelector((state) => state.cart);
  console.log(cart, 'in checkout')

  useEffect(() => {
    const data = cart.products.map(product => {
      return {
        name: product.product.item_name,
        amount_cents: product.product.price * 100,
        quantity: product.quantity,
      };
    });
    console.log('data', data)
    setItems(data);
  }, [cart]);

  const [paymentKeys, setPaymentKeys] = useState("");
  const [display, setDisplay] = useState("none");
  const [iframeID, setIframeID] = useState(402130);
  const [integrationID, setIntegrationID] = useState(2297355);
  const [cash, setCash] = useState(true);
  const [disable, setDisable] = useState({
    value: false,
    text: "SAVE AND CONTINUE",
  });
  const iframe = `https://accept.paymob.com/api/acceptance/iframes/${iframeID}?payment_token=`;

  const getToken = async() => {
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "api_key": "ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TWpBMU9Ea3lMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuOXBjWkVFbDNqRkxkZExSYTdjU1piMFhoU0d4RHpfYkp3WUZ6dVIyQXFZZlc4aS02Tmh3cHktNVdLNjNvUnlYN2pXQmNEZ2RNdzRaWnNFZzJqMTdzNGc="
    });

    return fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    }).then(data => data.json());



  }

  // axios.post("https://accept.paymob.com/api/auth/tokens", {
  //   api_key:
  //   "ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TWpBMU9Ea3lMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuOXBjWkVFbDNqRkxkZExSYTdjU1piMFhoU0d4RHpfYkp3WUZ6dVIyQXFZZlc4aS02Tmh3cHktNVdLNjNvUnlYN2pXQmNEZ2RNdzRaWnNFZzJqMTdzNGc=",
  //     headers : {
  //       "Access-Control-Allow-Origin" : "http://localhost:3000",
  //       "accept" : null ,
  //       "test" : "123124"
  //     },
  //     Headers : {
  //       "Access-Control-Allow-Origin" : "http://localhost:3000",
  //       "accept" : null ,
  //       "test" : "123124"
  //     }
  //   });

  const sendOrder = (token, data) => {
    axios.defaults.withCredentials = false;
    return axios.post("https://accept.paymob.com/api/ecommerce/orders", {
      auth_token: token,
      delivery_needed: "false",
      // amount_cents: `${Number(cart.total) * 100}`,
      amount_cents: `${(cart.total + 50) * 100}`,
      currency: "EGP",
      items: items,
      shipping_data: {
        apartment: data.apartment,
        email: data.email,
        floor: data.floor,
        first_name: data.firstName,
        street: data.street,
        building: data.building,
        phone_number: data.phone,
        extra_description: data.extraDescription,
        city: data.city,
        country: "EG",
        last_name: data.lastName,
        state: data.country,
      },
    });
  }


  const getPaymentKeys = (token, orderId, data, more) =>
    axios.post("https://accept.paymob.com/api/acceptance/payment_keys", {
      auth_token: token,
      // amount_cents: `${Number(cart.total) * 100}`,
      amount_cents: `${100 * (cart.total + 50)}`,
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        apartment: data.apartment,
        email: data.email,
        floor: data.floor,
        first_name: data.firstName,
        street: data.street,
        building: data.building,
        phone_number: data.phone,
        extra_description: data.extraDescription,
        city: data.city,
        country: "EG",
        last_name: data.lastName,
        state: "temp",
      },
      // token : more.token,
      currency: "EGP",
      integration_id: integrationID,
      lock_order_when_paid: "true",
    });

  const saveToCookies = token => {
    Cookies.set('_pt_', token, {
      domain: '.trendlix.com',
    });
  };

  const payment = (data) => {
    setLoading(true)
    console.log('here')
    // setDisable({ value: true, text: "PLEASE WAIT..." });
    getToken().then((response) => {
      console.log(response)
      // localStorage.setItem("token", JSON.stringify(response.data.token));
      saveToCookies(response.token)
      sendOrder(response.token, data).then((res) => {

        getPaymentKeys(response.token, res.data.id, data, res.data).then(
          (paymentdata) => {
            setPaymentKeys(paymentdata.data.token);
            setTimeout(() => {
              setDisplay("block");
              setLoading(false);
            }, 1000);
          }
        );
      });
    });
  };

  // const cashRequest = (token) =>
  //   axios.post("https://accept.paymob.com/api/acceptance/payments/pay", {
  //     source: {
  //       identifier: "cash",
  //       subtype: "CASH",
  //     },
  //     payment_token: token,
  //   });
  // const paymentCash = (data) => {
  //   setDisable({ value: true, text: "PLEASE WAIT..." });
  //   getToken().then((response) => {
  //     // localStorage.setItem("token", JSON.stringify(response.data.token));
  //     sendOrder(response.token, data).then((res) => {
  //       getPaymentKeys(response.token, res.data.id, data).then(
  //         (paymentdata) => {
  //           cashRequest(paymentdata.data.token).then((res) => {
  //             router.push(
  //               "/payment_response/?" + res.data.redirection_url.split("?")[1]
  //             );
  //           });
  //         }
  //       );
  //     });
  //   });
  // };
  
  const cashPaymentHandler = async (data) => {
    // try {
    //   const res = await axios.post(`${API_URL}/orders`, {
    //     headers: {
    //       "Accept": "*/*",
    //     },
    //     userData: {
    //       firstName: data.firstName,
    //       lastName: data.lastName,
    //       email: data.email,
    //       phone: data.phone,
    //       state: "temp",
    //       city: data.city,
    //       street: data.street,
    //       building: data.building,
    //       floor: data.floor,
    //       apartment: data.apartment,
    //       extraDescription: data.extraDescription,
    //     },
    //     orderedItems : cart.products,
    //     totalPrice : cart.total,
    //     delivery: 50,
    //     subTotal :  cart.total + 50,
    //     paymentMethod : 'Cash'
    //   })
    //   console.log(res.data)
    // } catch (e) {
    //   console.log(e)
    // }
    setLoading(true);
    const res = await makeOrder(data, 'Cash', integrationID);
    if(res?.data.ok){
      // remove cart after payment and order done
      dispatch(resetCart());
      localStorage.removeItem('cart');
      toast.success('Your order has been received', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        router.push(`/orders/${res.data.order._id}`);
    }else{
      toast.error(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    setLoading(false);
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="pb-5  d-flex justify-content-center"
      style={{ backgroundColor: "#ebeef5", paddingTop: "180px" }}
    >
      {loading && <LoadingOverlay isFullPage={true} />}
      <div className="container">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(cash)
            if (cash) {
              cashPaymentHandler(data);
            } else {
              payment(data);
            }
          })}
        >
          <div className="row">
            <h6 className="col-12" style={{ color: "#ababab", padding: "0" }}>
              CHECKOUT
            </h6>
          </div>
          <div className="row">
            <div
              className="col-12 col-md me-3 p-3"
              style={{
                backgroundColor: "white",
                boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
                borderRadius: "5px",
              }}
            >
              <h6
                className="pb-3"
                style={{ borderBottom: "1px solid #ededed" }}
              >
                <i
                  style={{ color: "#ababab", fontSize: "1.25rem" }}
                  className="fa fa-check-circle pe-4"
                  aria-hidden="true"
                ></i>{" "}
                DETAILS
              </h6>

              <div className="row">
                <div className="p-4">
                  <div className="row">
                    <div className="mb-3 col-6">
                      <label className="form-label">First Name*</label>
                      <input
                        {...register("firstName", {
                          required: "This is required",
                        })}
                        type="text"
                        className="form-control"
                      />
                      <p className="mb-0 pt-2 text-danger">
                        {errors.firstName?.message}
                      </p>
                    </div>
                    <div className="mb-3 col-6">
                      <label className="form-label">Last Name*</label>
                      <input
                        {...register("lastName", {
                          required: "This is required",
                        })}
                        type="text"
                        className="form-control"
                      />
                      <p className="mb-0 pt-2 text-danger">
                        {errors.lastName?.message}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone*</label>
                    <input
                      {...register("phone", {
                        required: "This is required",
                        minLength: {
                          value: 11,
                          message: "Min number is 11",
                        },
                        maxLength: {
                          value: 13,
                          message: "Max number is 13",
                        },
                      })}
                      type="number"
                      className="form-control"
                    />
                    <p className="mb-0 pt-2 text-danger">
                      {errors.phone?.message}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email*</label>
                    <input
                      {...register("email", { required: "This is required" })}
                      type="email"
                      className="form-control"
                    />
                    <p className="pb-0 pt-2 text-danger">
                      {errors.email?.message}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input
                      {...register("country")}
                      type="text"
                      className="form-control"
                    />
                    <p className="mb-0 pt-2 text-danger">
                      {errors.state?.message}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                      {...register("city")}
                      type="text"
                      className="form-control"
                    />
                    <p className="mb-0 pt-2 text-danger">
                      {errors.city?.message}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Street</label>
                    <input
                      {...register("street")}
                      type="text"
                      className="form-control"
                    />
                    <p className="mb-0 pt-2 text-danger">
                      {errors.street?.message}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Building</label>
                    <input
                      {...register("building")}
                      type="text"
                      className="form-control"
                    />
                    <p className="mb-0 pt-2 text-danger">
                      {errors.building?.message}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Floor</label>
                    <input
                      {...register("floor")}
                      type="text"
                      className="form-control"
                    />
                    <p className="mb-0 pt-2 text-danger">
                      {errors.floor?.message}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Apartment</label>
                    <input
                      {...register("apartment")}
                      type="text"
                      className="form-control"
                    />
                    <p className="mb-0 pt-2 text-danger">
                      {errors.apartment?.message}
                    </p>
                  </div>


                  <div className="mb-3">
                    <label className="form-label">Extra Description</label>

                    <textarea
                      {...register("extraDescription")}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3 mt-3 mt-md-0">
              <div
                className="row p-3"
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
                  borderRadius: "5px",
                }}
              >
                <div className="col-12">
                  <h6
                    className="pb-3"
                    style={{ borderBottom: "1px solid #ededed" }}
                  >
                    Your Order ({cart.products.length})
                  </h6>
                  {cart.products.map((product, i) => {
                    return (
                      <div className="row align-items-center" key={i}>
                        <div className="col-4">
                          <Image
                            width="100"
                            height="100"
                            src={
                              product.images
                                ? product.images[0]
                                : notFound
                            }
                            alt="Product"
                          />
                        </div>
                        <div className="col-8">
                          <p style={pStyle}>{product.name}</p>
                          <p
                            style={{
                              margin: "0",
                              color: "#20c997",
                              fontWeight: "bold",
                            }}
                          >
                            {product.price}
                          </p>
                          <p style={{ margin: "0" }}>Qty: {product.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className="row justify-content-between pt-2 pb-2"
                    style={{
                      borderBottom: "1px solid #ededed",
                      borderTop: "1px solid #ededed",
                    }}
                  >
                    <h6 className="col-4" style={{ margin: "0" }}>
                      Total
                    </h6>
                    <p
                      className="col-8 text-end"
                      style={{
                        margin: "0",
                        fontSize: "1rem",
                        color: "#20c997",
                        fontWeight: "bold",
                      }}
                    >
                      {cart.total}
                    </p>
                  </div>
                  <div
                    className="row justify-content-between pt-2 pb-2"
                    style={{
                      borderBottom: "1px solid #ededed",
                      borderTop: "1px solid #ededed",
                    }}
                  >
                    <h6 className="col-4" style={{ margin: "0" }}>
                      Delivery
                    </h6>
                    <p
                      className="col-8 text-end"
                      style={{
                        margin: "0",
                        fontSize: "1rem",
                        color: "#20c997",
                        fontWeight: "bold",
                      }}
                    >
                      50
                    </p>
                  </div>
                  <div
                    className="row justify-content-between pt-2 pb-2"
                    style={{
                      borderBottom: "1px solid #ededed",
                      borderTop: "1px solid #ededed",
                    }}
                  >
                    <h6 className="col-4" style={{ margin: "0" }}>
                      Subtotal
                    </h6>
                    <p
                      className="col-8 text-end"
                      style={{
                        margin: "0",
                        fontSize: "1rem",
                        color: "#20c997",
                        fontWeight: "bold",
                      }}
                    >
                      {cart.total + 50}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="row mt-3 p-3 "
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
                  borderRadius: "5px",
                }}
              >
                <div className="col-12">
                  <h6
                    className="pb-3"
                    style={{ borderBottom: "1px solid #ededed" }}
                  >
                    Payment Methods
                  </h6>
                  <div className="row">
                    <div className="col-12">
                      <div className="row mb-2 align-items-center">
                        <div className="col-2">
                          <input
                            checked={cash}
                            onChange={() => { }}
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            onClick={(e) => {
                              setIntegrationID(2501045)
                              setCash(true);
                            }}
                          />
                        </div>
                        <div className="col-3">
                          <Image
                            width="100%"
                            src={cashImage}
                            alt="cash"
                          />
                        </div>
                        <div className="col">
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Cash on delivery
                          </label>
                        </div>
                      </div>
                      <div className="row mb-2 align-items-center" >
                        <div className="col-2">
                          <input
                            onClick={() => {
                              // setIntegrationID(2810495)
                              setIntegrationID(2232880)
                              setIframeID(402130);
                              setCash(false);
                            }}
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                          />
                        </div>
                        <div className="col-3">
                          <Image
                            width="100%"
                            src={cardImage}
                            alt="credit card"
                          />
                        </div>
                        <div className="col">
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Online Payment
                          </label>
                        </div>
                      </div>
                      <div className="row mb-2 align-items-center">
                        <div className="col-2">
                          <input
                            onClick={() => {
                              setIntegrationID(2376472)
                              setIframeID(671776);
                              setCash(false);
                            }}
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                          />
                        </div>
                        <div className="col-3">
                          <Image
                            width="100%"
                            src={instalmentImage}
                            alt="instalment"
                          />
                        </div>
                        <div className="col">
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Bank Installment
                          </label>
                        </div>
                      </div>
                      <div className="row mb-2 align-items-center">
                        <div className="col-2">
                          <input
                            onClick={() => {
                              setIntegrationID(2336861);
                              setIframeID(407523);
                              setCash(false);
                            }}
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                          />
                        </div>
                        <div className="col-3">
                          <Image
                            width="100"
                            height="100"
                            src="https://accept.paymobsolutions.com/static/img/ValU.png"
                            alt="valu"
                          />
                        </div>
                        <div className="col">
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            VaLU
                          </label>
                        </div>
                      </div>
                      <div className="row mt-5">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={disable.value}
                        >
                          {!loading ? disable.text : 'Your order is being prepared...'}
                        </button>


                      </div>
                      <div style={{ zIndex: '-1' }}>
                        <PaymentSlider number={1}></PaymentSlider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="row mt-3" >
          <div className="col-12 ps-0 pe-0">
            <Image src={sliderImage5} alt="slider" width="100%" />
          </div>
        </div>
      </div >

      <div
        className="container p-0"
        style={{
          minWidth: "102vw",
          height: "100vh",
          position: "fixed",
          background: "#f2f2f2",
          zIndex: "999",
          top: '0px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: display,
        }}
      >
        <div
          className="row justify-content-center"
          style={{
            zIndex: "1",
            // top: "20%",
            height: "100%",
          }}
        >
          <div className="col-12 text-end pt-3">
            <span style={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bold' }} className="text-danger p-4" onClick={() => {
              setDisplay('none');
              setDisable({ value: false, text: "Checkout" })
            }}>X</span>
          </div>
          <Iframe
            allowtransparency="false"
            className="col-12 col-md-12"
            url={`${iframe}${paymentKeys}`}
            height="100%"
            id="myId"
          />
        </div>
      </div>
    </motion.div >
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  // try {
  //   const req = await axios.get(`${API_URL}/users/me`)
  // } catch (e) {

  // }
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