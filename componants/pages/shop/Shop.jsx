import React from "react";
import { useState, useEffect } from "react";
import { fetchProduct } from "../../../API/product";
import Product from "./Product";
import { motion } from "framer-motion";
import Loading from "../../Loading";
import { useParams } from "react-router-dom";
import sliderImage5 from "../../../img/slider4.jpg";
import sliderImage6 from "../../../img/slider2.jpg";
import PaymentSlider from "../../PaymentSlider";
import phones from "../../../img/phones   inner banner 1.png";
import charger from "../../../img/CHARGER banner 1.png";
import smartWatches from "../../../img/smart watch inner banner 1.png2.png";
import headPhones from "../../../img/HEADPHONES  banner 1.png";
import accessories from "../../../img/Accessories  inner banner 1.jpeg";


const banners = {
  'Mobiles': phones,
  'Chargers': charger,
  'Smart Watches': smartWatches,
  'Headphones': headPhones,
  'Cases': accessories,
}


const scrollTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const Shop = () => {
  const { category } = useParams();
  console.log(category)
  // products hooks
  const [products, setProducts] = useState([]);
  // categories hooks
  const [categories, setCategories] = useState([]);
  const [selecterdCategory, setSelecterdCategory] = useState(category);
  // brand hooks
  const [brands, setBrands] = useState([]);
  const [selectedBradns, setSelectedBradns] = useState("");

  // loading hooks
  const [loading, setLoading] = useState();
  // pagination hooks
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(12);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  var pageNumber = [];
  for (let i = 1; i <= Math.ceil(products.length / productPerPage); i++) {
    pageNumber.push(i);
  }

  const getProducts = async (selecterdCategory) => {
    try {
      var res;
      var resBrand;
      if (selecterdCategory == "all") {
        if (selectedBradns != "") {
          setLoading(true);
          res = await fetchProduct.get(`/products/brand/${selectedBradns}`);
          setProducts(res.data);
          console.log(res.data);
          setLoading(false);
        } else {
          setLoading(true);
          res = await fetchProduct.get("/products");
          resBrand = await fetchProduct.get("/brand");
          setProducts(res.data);
          setBrands(resBrand.data);
          setLoading(false);
        }
      } else {
        if (selectedBradns != "") {
          setLoading(true);
          res = await fetchProduct.get(`/products/brand/${selectedBradns}`, {
            params: {
              category: selecterdCategory
            }
          });
          setProducts(res.data);
          setLoading(false);
        } else {
          setLoading(true);
          res = await fetchProduct.get(`/category/${selecterdCategory}`);
          resBrand = await fetchProduct.get(`/brand/${selecterdCategory}`);
          setBrands(resBrand.data);
          setProducts(res.data);
          setLoading(false);
        }
      }
      setProducts(res.data);
    } catch (er) { }
  };

  const getCategories = async () => {
    try {
      const res = await fetchProduct.get("/category");
      setCategories(res.data);
    } catch (er) { }
  };

  useEffect(() => {
    getProducts(selecterdCategory);
    getCategories();
  }, [selectedBradns]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ backgroundColor: "#ebeef5", paddingTop: "150px" }}

    >
      <div className="container p-0">
        <div className="row justify-content-md-between justify-content-center ">
          
          {category == 'all' ? <img className="col-11 col-md-12 p-2" src={sliderImage6} alt="hatly store" /> :
            <img className="col-11 col-md-12 p-2" src={banners[category]} alt="hatly store" />
          }
        </div>
      </div>
      <div className="" style={{ position: 'fixed', bottom: '0', zIndex: '999', width: '100vw' }}>
        <div className="row justify-content-center d-md-none">
          <div
            className="col-12 ps-5 pe-5 pt-2 pb-2"
            style={{
              backgroundColor: "#3a4c8d",
              boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
              borderRadius: "5px",
              color: 'white'
            }}
          >
            <div className="row justify-content-between">
              <h4
                className="col"
                style={{ padding: "10px", display: "inline-block", color: 'white' }}
              >
                Brands
              </h4>
            </div>
            <div className="row">
              {brands.map((brand, i) => {
                return (
                  <div className="col-auto" key={i}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        value={brand.brand}
                        type="radio"
                        name="brand"
                        id={`brand${i}`}
                        onChange={(e) => {
                          scrollTop()
                          setCurrentPage(1);
                          setSelectedBradns(e.target.value);
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`brand${i}`}
                      >
                        {brand.brand}
                      </label>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
      <div className="container pt-2 pb-3" style={{ position: 'relative' }}>
        <div className="row">
          <div
            className="d-none d-md-block col-md-3 p-3"
            style={{
              backgroundColor: "white",
              boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
              borderRadius: "5px",
            }}
          >

            <div className="row justify-content-between">
              <h4
                className="col"
                style={{ padding: "10px", display: "inline-block" }}
              >
                Brands
              </h4>
              <i
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                className="col fa fa-minus"
                aria-hidden="true"
              ></i>
            </div>
            {brands.map((brand, i) => {
              return (
                <div key={i}>
                  <div className="row justify-content-between">
                    <div className="col-9">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          value={brand.brand}
                          type="radio"
                          name="brand"
                          id={`brand${i}`}
                          onChange={(e) => {
                            setCurrentPage(1);
                            setSelectedBradns(e.target.value);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`brand${i}`}
                        >
                          {brand.brand}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="col ms-md-3 p-3"
            style={{
              backgroundColor: "white",
              boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
              borderRadius: "5px",
            }}
          >
            <div
              className="row justify-content-between mb-3"
              style={{ borderBottom: "1px solid #ededed" }}
            >
              <div className="col-3">
                <h4>Prodcuts</h4>
              </div>
              <div className="col-3 mb-2">
                <select
                  className="form-select"
                  onChange={(e) => {
                    if (e.target.value == 2) {
                      setProducts([
                        ...products.sort((a, b) => {
                          if (a.price_list_rate < b.price_list_rate) return 1;
                          if (a.price_list_rate > b.price_list_rate) return -1;
                          return 0;
                        }),
                      ]);
                    } else if (e.target.value == 3) {
                      setProducts([
                        ...products.sort((a, b) => {
                          if (a.price_list_rate < b.price_list_rate) return -1;
                          if (a.price_list_rate > b.price_list_rate) return 1;
                          return 0;
                        }),
                      ]);
                    }
                  }}
                >
                  <option defaultValue disabled hidden>
                    Sort by
                  </option>
                  <option value="1">Default</option>
                  <option value="2">Price: High to Low</option>
                  <option value="3">Price: Low to High</option>
                </select>
              </div>
            </div>
            <div className="row justify-content-end">
              <div
                className="col-1"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <i
                  className="fa fa-th-large"
                  style={{ fontSize: "20px", color: "#074282" }}
                ></i>
              </div>
            </div>
            <div className="row" style={{ alignItems: "flex-end" }}>
              {!loading ? (
                currentProducts.map((product, i) => {
                  return (
                    <Product
                      grid="col-6 col-sm-4 col-md-4 col-lg-3 mb-5"
                      key={i}
                      data={product}
                    ></Product>
                  );
                })
              ) : (
                <Loading grid="col-12 col-sm-12 col-md-12 col-lg-4 mb-5 bg-white p-3"></Loading>
              )}
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {pageNumber.map((number, i) => {
                  return (
                    <li className="page-item" key={i}>
                      <a
                        className="page-link"
                        href="#"
                        value={number}
                        onClick={(e) => {
                          const number = e.target.getAttribute("value");
                          setCurrentPage(number);
                        }}
                      >
                        {number}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="container p-0">
        <PaymentSlider number={3}></PaymentSlider>
        <img src={sliderImage5} alt="" width="100%" />
      </div>
    </motion.div>
  );
};

export default Shop;
