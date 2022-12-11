import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import card from "../../../img/card.png";
import faild from "../../../img/faild.png";
import loadingPic from "../../../img/loading.gif";
import axios from "axios";
import { fetchProduct } from "../../../API/product";
import { useSelector } from "react-redux";

const PaymentResponse = () => {
  const cart = useSelector((state) => state.cart);
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderID, setOrderID] = useState("");
  const [success, setSuccess] = useState(false);
  const [transctionId, setTransctionId] = useState("");
  const [messeage, setMesseage] = useState("");
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const getTransactionByid = (transctionId) => {
    setSuccess(searchParams.get("success"));
    setTransctionId(searchParams.get("id"));
    if (transctionId == "") {
    } else {
      if (success) {
        setTimeout(() => {
          axios
            .get(
              `https://accept.paymob.com/api/acceptance/transactions/${transctionId}`,
              {
                headers: {
                  authorization: token,
                },
              }
            )
            .then((res) => {
              setOrderID(res.data.order.id);
              setMesseage(res.data.data.txn_response_code);
              fetchProduct
                .put("/products/changeQuantity", {
                  items: cart.products,
                })
                .then(() => {
                  setLoading(false);
                  fetchProduct.post("/mail", {
                    to: res.data.billing_data.email,
                    name: `${res.data.billing_data.first_name} ${res.data.billing_data.last_name}`,
                    items: res.data.order.items,
                    orderID: res.data.order.id,
                  });
                });
            })
            .catch((err) => { });
        }, 2000);
      }

    }
  };
  useEffect(() => {
    getTransactionByid(transctionId);
  }, [transctionId, success]);

  return (
    <div className="container" style={{ paddingTop: "150px" }}>
      {loading ? (
        <div className="row justify-content-center">
          <img className="col-auto" width="100%" src={loadingPic}></img>
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
                  <img
                    width="80%"
                    src={card}
                    style={{
                      padding: "30px",
                      backgroundColor: "#20c997",
                      borderRadius: "20%",
                    }}
                  ></img>
                ) : (
                  <img width="100%" src={faild}></img>
                )}
              </div>
            </div>
            <div className="row">
              <h3 className="p-4">
                {success != "false"
                  ? "THANK YOU!"
                  : `${messeage}`}
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
                to="/"
                className="btn col-6 col-md-2 mt-3 text-white"
                style={{ backgroundColor: "#20c997" }}
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentResponse;
