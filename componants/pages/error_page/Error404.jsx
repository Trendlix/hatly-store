import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
const Error404 = () => {
  return (
    <div className="container mb-5" style={{ paddingTop: "70px" }}>
      <div className="row justify-content-center" style={{ height: "100vh" }}>
        <div
          className="col-12 p-4 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "white",
            boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
            borderRadius: "5px",
            flexDirection: "column",
          }}
        >
          <FontAwesomeIcon
            style={{ fontSize: "7rem", color: "#394b8c" }}
            icon={faSadTear}
          ></FontAwesomeIcon>
          <h1 style={{ fontSize: "4rem" }} className="pt-4">
            404
          </h1>
          <p style={{ color: "#394b8c" }}>page not found</p>
          <Link onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
            to="/"
            className="btn col-6 col-md-2 mt-3 text-white"
            style={{ backgroundColor: "#245891" }}
          >
            Return To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
