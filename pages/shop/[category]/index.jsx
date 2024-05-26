import React from "react";
import { useState, useEffect } from "react";
import { fetchProduct } from "../../../API/product";
import Product from "../../../componants/pages/shop/Product";
import { motion } from "framer-motion";
import Loading from "../../../componants/Loading";

import { useRouter } from 'next/router'

import sliderImage5 from "../../../img/slider4.jpg";
import sliderImage6 from "../../../img/slider2.jpg";
import PaymentSlider from "../../../componants/PaymentSlider";

import phones from "../../../img/phones   inner banner 1.png";
import charger from "../../../img/CHARGER banner 1.png";
import smartWatches from "../../../img/smart watch inner banner 1.png2.png";
import headPhones from "../../../img/HEADPHONES  banner 1.png";
import accessories from "../../../img/Accessories  inner banner 1.jpeg";
import Image from "next/image";
import tablet from "@/../../public/tablet.jpg"
import laptop from "@/../../public/laptop.png"
import mobile from "@/../../public/mobile.jpg"
import headphones from "@/../../public/headphones.jpg"
import watch from "@/../../public/watch.jpg"



const banners = {
  'phones': phones,
  'chargers': charger,
  'smart watches': smartWatches,
  'headphones': headPhones,
  'accessories': accessories,
}


const scrollTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

// const dataArray = [
//   { price_list_rate: 20, id: 1, image: mobile, actual_qty: 100, item_group: 'mobiles', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", item_name: 'mobile' },
//   { price_list_rate: 30, id: 2, image: laptop, actual_qty: 100, item_group: 'mobiles', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", item_name: 'laptop' },
//   { price_list_rate: 15, id: 3, image: tablet, actual_qty: 100, item_group: 'mobiles', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", item_name: 'tablet' },
//   { price_list_rate: 25, id: 4, image: watch, actual_qty: 100, item_group: 'mobiles', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", item_name: 'smartwatch' },
//   { price_list_rate: 35, id: 5, image: headphones, actual_qty: 100, item_group: 'mobiles', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", item_name: 'headphones' }
// ];



const Shop = ({ category }) => {
  console.log(category)
  const router = useRouter()
  // const {category}  = router?.query
  
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
  console.log(products)
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  var pageNumber = [];
  for (let i = 1; i <= Math.ceil(products.length / productPerPage); i++) {
    pageNumber.push(i);
  }

  const getProducts = async (selecterdCategory) => {
    setLoading(true);
    try {
      let res;
      let resBrand;

      if (selecterdCategory == "all") {
        if (selectedBradns !== "" && selectedBradns !== 'all') {
          res = await fetchProduct.get(`/products/brand/${selectedBradns}`);
          setProducts(res.data);
          console.log('if category is all, brands is not all and there is a brand ',res.data);
        } else {
          res = await fetchProduct.get("/products");
          resBrand = await fetchProduct.get("/brand");
          console.log(resBrand)
          console.log(1)
          setProducts(res.data);
          console.log('if category is all, brands is all and there is no brand selected',res.data);
          setBrands(resBrand.data);
          console.log('the all brands returned', resBrand.data)
        }
      } else {
        if (selectedBradns !== "" && selectedBradns !== 'all') {
          res = await fetchProduct.get(`/products/brand/${selectedBradns}?category=${selecterdCategory}`);
          setProducts(res.data);
        } else {
          res = await fetchProduct.get(`/category/${selecterdCategory}`);
          resBrand = await fetchProduct.get(`/brand/${selecterdCategory}`);
          setBrands(resBrand.data);
          setProducts(res.data);
        }
      }
      console.log(res)
      setProducts(res.data);
    } catch (er) {
      console.log(er)
    }
    setLoading(false);
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
      style={{ backgroundColor: "#ebeef5", paddingTop: "180px" }}

    >
      <div className="container p-0">
        <div className="row justify-content-md-between justify-content-center ">

          {category == 'all' ? <Image className="col-11 col-md-12 p-2" src={sliderImage6} alt="hatly store" width="100%" /> :
            <Image className="col-11 col-md-12 p-2" src={banners[category]} alt="hatly store" width="100%" />
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
             <div className="form-check">
              <input
                className="form-check-input"
                value='all'
                type="radio"
                name="brand"
                id={`brand-all`}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSelectedBradns(e.target.value);
                }}
              />
              <label
                className="form-check-label"
                htmlFor={`brand-all`}
              >
                All
              </label>
            </div>
            <div className="row">
              {brands.length > 0 && brands?.map((brand, i) => {
                return (
                  <div className="col-auto" key={i}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        value={brand}
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
                        {brand}
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
            <div className="form-check">
              <input
                className="form-check-input"
                value='all'
                type="radio"
                name="brand"
                id={`brand-all`}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSelectedBradns(e.target.value);
                }}
              />
              <label
                className="form-check-label"
                htmlFor={`brand-all`}
              >
                All
              </label>
            </div>
            {brands.length > 0 && brands?.map((brand, i) => {
              return (
                <div key={i}>
                  <div className="row justify-content-between">
                    <div className="col-9">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          value={brand}
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
                          {brand}
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
                <h4>Products</h4>
              </div>
              <div className="col-5 col-sm-8 col-md-4 mb-2 d-flex flex-column flex-sm-row gap-3">
                <select
                  className="form-select"
                  onChange={(e) => {
                    if (e.target.value == 2) {
                      setProducts([
                        ...products.sort((a, b) => {
                          if (a.price < b.price) return 1;
                          if (a.price > b.price) return -1;
                          return 0;
                        }),
                      ]);
                    } else if (e.target.value == 3) {
                      setProducts([
                        ...products.sort((a, b) => {
                          if (a.price < b.price) return -1;
                          if (a.price > b.price) return 1;
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


                <select
                  className="form-select d-md-none"
                  onChange={(e) => {

                    setCurrentPage(1);
                    setSelectedBradns(e.target.value);

                  }}
                >
                  <option defaultValue disabled hidden>
                    Sort by
                  </option>
                  <option value="all">All</option>
                  {brands.length > 0 && brands?.map((brand, i) => {
                    return <option key={i} value={brand}>{brand}</option>

                    // <option value={i+2}>1</option>
                  })}
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
            <div aria-label="Page navigation example">
              <ul className="pagination">
                {pageNumber.map((number, i) => {
                  return (
                    <li className="page-item" key={i}>
                      <p
                        className="page-link"
                        value={number}
                        onClick={(e) => {
                          const number = e.target.getAttribute("value");
                          setCurrentPage(number);
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
          </div>
        </div>
      </div>

      <div className="container p-0">
        <PaymentSlider />
        <Image src={sliderImage5} alt="" width="100%" />
      </div>
    </motion.div>
  );
};

export async function getServerSideProps(context) {
  const { category } = context.params
  return {
    props: {
      category
    }, // will be passed to the page component as props
  }
}
export default Shop;
