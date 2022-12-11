import React, { useState } from "react";
import { removeProduct } from "../../../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import caseImage from "../../../img/image4-1536x1152.png";
import notFound from "../../../img/notFound.png";
import Link from "next/link";
import Image from "next/image";

const pStyle = {
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "-webkit-box",
  whiteSpace: "normal",
  overflow: "hidden",
  fontWeight: "600",
};

const FilledCart = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="row mt-4">
      <div
        className="col-12 col-lg  me-3 p-3"
        style={{
          backgroundColor: "white",
          boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
          borderRadius: "5px",
        }}
      >
        <div className="row">
          <h5 className="pb-3" style={{ borderBottom: "1px solid #ededed" }}>
            Cart ({props.data.products.length})
          </h5>
        </div>
        <div className="row">
          {props.data.products.map((data, i) => {
            return (
              <div className="col-6 col-md-6 col-lg-4 col-xl-3 pt-3" key={i}>
                <div
                  key={i}
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "#3c4a8b",
                    color: "white",
                  }}
                >
                  <div className="row p-3">
                    <Link onClick={() => {
                      window.scroll({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                      href={`/product/${data.id}`}
                      className="col-12 col-md-12"
                    >
                      <Image width="100" height="100" style={{ filter: 'drop-shadow(white 0px 0px 70px)' }} src={data.image ? `https://hatlystore.tswsp.net${data.image}` : notFound} alt="cart"></Image>
                    </Link>
                    <div className="col-12 col-md-12 mb-0">
                      <p style={pStyle}>
                        <span
                          style={{
                            width: "100%",
                            color: "#20c997",
                            fontSize: "20px",
                            fontWeight: "bold",
                            textAlign: "center",
                            margin: "0",
                          }}
                        >
                          [{data.quantity}]{" "}
                        </span>
                        {data.item_name}
                      </p>
                      <div className="row justify-content-between">
                        <p
                          className="col-auto"
                          style={{
                            fontWeight: "600",
                            fontSize: "1rem",
                            color: "#20c997",
                            margin: "0",
                          }}
                        >
                          {`EGP ${data.price_list_rate * data.quantity}`}
                        </p>
                        <Link
                          className="text-danger col-auto"
                          align="right"
                          href="/cart"
                          onClick={(e) => {
                            window.scroll({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                            if (props.data.quantity > 0) {
                              dispatch(
                                removeProduct({
                                  id: data.id,
                                  price: data.price_list_rate * data.quantity,
                                })
                              );
                            }
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ fontSize: "20px" }}
                          ></FontAwesomeIcon>
                        </Link>
                      </div>

                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-12 col-lg-3 mt-3 mt-lg-0">
        <div
          className="row p-3"
          style={{
            backgroundColor: "white",
            boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
            borderRadius: "5px",
          }}
        >
          <div className="col-12">
            <div className="row">
              <h6
                className="pb-3"
                style={{ borderBottom: "1px solid #ededed" }}
              >
                CART SUMMARY
              </h6>
            </div>
            <div
              className="row justify-content-between pt-2 pb-2"
              style={{ borderBottom: "1px solid #ededed" }}
            >
              <h6 className=" col-4">Subtotal</h6>
              <p
                className="col-8 text-end"
                style={{ fontWeight: "500", margin: "0", fontSize: "1.25rem" }}
              >
                {props.data.total} EGP
              </p>
            </div>
            <div className="row">
              <Link onClick={() => {
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }} className="btn btn-primary" href="/checkout">
                CHECKOUT ({props.data.total})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilledCart;
