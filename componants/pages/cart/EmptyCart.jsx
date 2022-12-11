import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div
      className="row mt-4 p-4"
      style={{
        backgroundColor: "white",
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
        borderRadius: "5px",
      }}
    >
      <div
        className="col"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <i
          style={{
            fontSize: "80px",
            borderRadius: "50%",
            backgroundColor: "#0d6efd17",
            color:'#3a4c8d'
          }}
          className="fa p-3 fa-cart-plus "
        ></i>
        <h6 className="p-3">Your cart is empty!</h6>
        <p>Browse our categories and discover our best deals!</p>
        <Link onClick={() => {
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }} className="btn btn-primary" to="/shop/all">
          START SHOPPING
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
