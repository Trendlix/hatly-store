import React from "react";
import { useState, useEffect } from "react";
import Product from "../../../componants/pages/shop/Product";
import Link from 'next/link'
import { fetchProduct } from "../../../API/product";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, addToCart } from "../../../redux/cartRedux";
import { motion } from "framer-motion";
import ReactImageMagnify from "react-image-magnify";
import { storeData } from "../../../redux/recentlyRedux";
import notFound from "../../../img/notFound.png";
import LoadingSingle from "../../../componants/LoadingSingle";
import sliderImage3 from "../../../img/slider2.jpg";
import sliderImage5 from "../../../img/slider6.jpg";
import BookItem from "../../../componants/BookItem/BookItem";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import CopyLink from "../../../componants/CopyLink/CopyLink";
import { getUser, userState } from "../../../redux/features/user/userSlice";


const SingleProduct = () => {
  const user = useSelector(userState)
  const router = useRouter()
  const { productId } = router.query
  console.log(productId)
  const dispatch = useDispatch();
  const recentlyViewed = useSelector((state) => state.recently);
  const cart = useSelector((state) => state.cart);
  console.log(cart)
  const productIndex = cart.products.length > 0 ? cart.products.findIndex(product => product._id == productId) : -1
  const productQuantity = productIndex > -1 ? cart.products[productIndex].quantity : 1
  const [selectedBradns, setSelectedBradns] = useState()
  // const recentlyViewed = {products: [{ price_list_rate: 20, id: 1, image: mobile, item_name: 'mobile', actual_qty: 100, item_group: 'mobiles', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }, { price_list_rate: 20, id: 1, image: mobile, item_name: 'mobile', actual_qty: 100, item_group: 'mobiles', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }, { price_list_rate: 20, id: 1, image: mobile, item_name: 'mobile', actual_qty: 100, item_group: 'mobiles', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }]}
  const [img, setimgs] = useState();
  const [product, setProduct] = useState({});
  const [productImgs, setProductImgs] = useState();
  const [productCategoey, setProductCategoey] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [singleProductQuantity, setSingleProductQuantity] = useState(productQuantity);
  const [loading, setLoading] = useState(false);
  const [gallary, setGallary] = useState([]);
  const [addCartDisable, setAddCartDisable] = useState({
    on: false,
    discrption: "ADD TO CART",
  });
 
  
  const handleClick = (e) => {
    setAddCartDisable({ on: true, discrption: "PRODUCT ON THE CART" });
    dispatch(
      addToCart({
        product,
        // price: product.price_list_rate,
        quantity: singleProductQuantity,
      })
    );
  };
  const [book, setBook] = useState(false);

  const handleBookItem = () => {
    setBook(prev => true);
  }

  const getProduct = async () => {
    try {
      const res = await fetchProduct.get(`products/erp/${productId}`)
      console.log(res)
      // const res2 = await fetchProduct.get(`attactments`, {
      //   params: {
      //     code: res.data[0].item_code
      //   }
      // })
      setGallary(res.data[0]?.image?.map((el) => {
        return el
      }))

      setLoading(false);
      setProduct(res.data[0]);
      setimgs(res.data[0].image ? res.data[0].image[0].length > 1 ? res.data[0].image[0] : notFound : notFound);
      setProductImgs([
        res.data[0].image ? res.data[0].image[0].length > 1 ? res.data[0].image[0] : notFound : notFound,
      ]);
      setProductCategoey(res.data[0].item_group);
      setSelectedBradns(res.data[0].brand)
      cart.products.map((item, i) => {
        if (item.item_code == res.data[0].item_code) {
          setAddCartDisable({ on: true, discrption: "PRODUCT ON THE CART" });
        }
      });
      var recentlyData;
      if (localStorage.getItem("product") == null) {
        localStorage.setItem("product", JSON.stringify([res.data[0]]));
      } else {
        recentlyData = JSON.parse(localStorage.getItem("product"));
        if (recentlyData._id) {
          recentlyData = [res.data[0], ...recentlyData];
        } else {
          recentlyData.map((el, i) => {
            if (el._id == res.data[0].item_code) {
              return recentlyData.splice(i, 1);
            }
          });
          recentlyData = [res.data[0], ...recentlyData];
        }
        localStorage.setItem("product", JSON.stringify(recentlyData));
      }
      dispatch(
        storeData({
          recentlyData,
        })
      );
    } catch (er) { }
  };

  const getRelatedProducts = async (selectedBradns) => {
    try {
      var res;
      res = await fetchProduct.get(`/products/brand/${selectedBradns}`, {
        params: {
          category: productCategoey
        }
      });
      setRelatedProducts(res.data);
    } catch (er) { }
  };

  const getRelatedGallary = async (productCategoey) => {
    try {
      var res;
      res = await fetchProduct.get(`/category/${productCategoey}`);
      setRelatedProducts(res.data);
    } catch (er) { }
  };

  useEffect(() => {
    getProduct()
  }, [productId]);

  useEffect(() => {
    if (productCategoey !== undefined) {
      getRelatedProducts(selectedBradns);
    }
  }, [productCategoey]);

  return (
    <>
      {book ? <BookItem /> : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="pb-5"
        style={{ backgroundColor: "#ebeef5", paddingTop: "180px" }}
      >
        {loading ? (
          <div className="container">
            <LoadingSingle></LoadingSingle>
          </div>
        ) : (
          <div className="container">
            <div className="d-grid custom-grid">
              <motion.div
                initial={{ y: "-500px", opacity: 0 }}
                animate={{ y: "0px", opacity: 1 }}
                transition={{
                  duration: 1,
                  repeatDelay: 1,
                }}
                style={{ width: "100%"  , height: "100%" }} 
                className="col-11 col-lg me-md-3 p-0"
              >
                <div className="row justify-content-center">
                  <div className="col-2">
                    {gallary?.map((image, i) => {
                      console.log(image)
                      return (
                        <div key={i} className="col-12 mt-2 col-md-12">
                          <Image
                            onClick={(e) => {
                              setimgs(e.target.getAttribute("src"));
                            }}
                            src={image.length > 1 ? image : notFound}
                            style={{ width: "100%", cursor: "pointer" }}
                            width="100"
                            height="100"
                            alt="Product"
                          ></Image>
                        </div>
                      );
                    })}
                  </div>
                  <div className="col-10  col-lg-8 d-flex justify-content-center js">
                    <ReactImageMagnify
                      style={{
                        borderRadius: "5px",
                        overflow: "hidden",
                        width: "30%",
                      }}
                      {...{
                        smallImage: {
                          alt: "Wristwatch by Ted Baker London",
                          isFluidWidth: true,
                          src: img?.length > 1 ? img : notFound.src,
                        
                        },
                        largeImage: {
                          src: img?.length > 1 ? img : notFound.src,
                          width: 800,
                          height: 800,
                        },
                        enlargedImageContainerDimensions: {
                          width: "50%",
                          height: "50%",
                        },
                        enlargedImagePosition: "over",
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: "500px" }}
                animate={{ y: "0px" }}
                exit={{ x: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
                style={{ width: "100%"  , height: "100%" }}
                className="col-11 col-lg-5 mt-4 mt-lg-0 d-flex align-items-start p-0 flex-column gap-4"
              >
                <div
                  className="p-4 col-12"
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 13px 86px rgb(0 0 0 / 10%)",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    position: "relative",
                  }}
                >
                <CopyLink link={productId}/>

                  <div
                    className="col-12 col-md-12"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="row"
                      style={{ borderBottom: "1px solid #ededed" }}
                    >
                      <h4
                        className=""
                        style={{
                          width: "90%",
                          fontSize: "1.25rem",
                          color: "#282828",
                          fontWeight: "400",
                        }}
                      >
                        {product.name}
                      </h4>

                      <p>
                        Category:{" "}
                        <Link onClick={() => {
                          window.scroll({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                        }}
                          href={`/shop/${product.item_group}`}
                          style={{ color: "#264996", textDecoration: "none" }}
                        >
                          {product.item_group}
                        </Link>
                      </p>
                    </div>

                    {/* {product.actual_qty > 0 && product.actual_qty < 10 ? ( */}
                    {product.stockQty > 0 ? (
                      <div className="row mt-2">
                        <div className="col-12">
                          <button disabled className="text-white btn btn-success">In Stock</button>
                          <p className="pt-3">
                            {
                              <button
                                className="btn btn-success fw-bold"
                                disabled
                              >
                                {" "}
                                {parseInt(product.stockQty - singleProductQuantity)}{" "}
                              </button>
                            }{" "}
                            Items remaining
                          </p>

                          <button
                            className="btn btn-primary"
                            disabled={addCartDisable.on}
                            onClick={() => {
                              if (singleProductQuantity > 1) {
                                setSingleProductQuantity(
                                  singleProductQuantity - 1
                                );
                              }
                            }}
                            style={{
                              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                              color: "white",
                            }}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <i className="p-3">{singleProductQuantity}</i>
                          <button
                            className="btn btn-primary"
                            disabled={addCartDisable.on}
                            onClick={() => {
                              if (
                                singleProductQuantity > 0 &&
                                singleProductQuantity < product.stockQty
                              ) {
                                setSingleProductQuantity(
                                  singleProductQuantity + 1
                                );
                              }
                            }}
                            style={{
                              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                              color: "white",
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    ) : (product.stockQty >= 1 ? (
                      <div className="row mt-2">
                        <div className="col-12">
                          <button disabled className="text-white btn btn-success mb-3">In Stock</button>
                          <br></br>
                          <button
                            className="btn btn-primary"
                            disabled={addCartDisable.on}
                            onClick={() => {
                              if (singleProductQuantity > 1) {
                                setSingleProductQuantity(
                                  singleProductQuantity - 1
                                );
                              }
                            }}
                            style={{
                              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                              color: "white",
                            }}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className="p-3">{singleProductQuantity}</span>
                          <button
                            className="btn btn-primary"
                            disabled={addCartDisable.on}
                            onClick={() => {
                              if (
                                singleProductQuantity > 0 &&
                                singleProductQuantity < product.stockQty
                              ) {
                                setSingleProductQuantity(
                                  singleProductQuantity + 1
                                );
                              }
                            }}
                            style={{
                              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                              color: "white",
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    ) : (<button className="btn btn-danger fw-bold" disabled>
                      Sold Out
                    </button>)
                    )}

                    <div className="row pt-3">
                      <div className="col">
                        <h4>
                          EGP{" "}
                          <span className="text-success" style={{ fontWeight: "bold" }}>
                            {parseInt(product?.price)}
                          </span>
                        </h4>
                        {product.stockQty > 0 ? (
                          <>
                            <button
                              disabled={addCartDisable.on}
                              className="btn btn-primary p-2 mt-4"
                              style={{ width: "100%" }}
                              onClick={handleClick}
                            >
                              <span>
                                <i className="fa fa-cart-plus"></i>
                              </span>{" "}
                              {addCartDisable.discrption}
                            </button>

                            <button
                              disabled={addCartDisable.on}
                              className="btn btn-warning p-2 mt-4"
                              style={{ width: "100%" }}
                              onClick={handleBookItem}
                            >
                              <span>
                                <i className="fa fa-bookmark"></i>
                              </span>{" "}
                              BOOK
                            </button>
                          </>
                        ) : (
                          <button
                            disabled={true}
                            className="btn btn-primary p-2 mt-4"
                            style={{ width: "100%" }}
                            onClick={handleClick}
                          >
                            <span>
                              <i className="fa fa-cart-plus"></i>
                            </span>{" "}
                            {"Sold Out"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* <video src={video}
                style={{
                  width: "100%",
                  height: "300px",
                  margin: "1rem 0",
                }}
                controls>

              </video> */}

            </div>
            <div className="row justify-content-center">
              <motion.div
                initial={{ x: "-500px", opacity: 0 }}
                animate={{ x: "0px", opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 1,
                }}
                className="col-11 col-md-12  mt-3 p-4"
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
                  borderRadius: "5px",
                }}
              >
                <h4
                  className="pb-2"
                  style={{ borderBottom: "1px solid #ededed" }}
                >
                  KEY FEATURES
                </h4>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </motion.div>
            </div>
            <div className="row mt-3" >
              <div className="col-12 ps-0 pe-0">
                <Image src={sliderImage3} width="100%" alt="slider" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              className="row p-4 mt-3 "
              style={{
                backgroundColor: "white",
                boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
                borderRadius: "5px",
                alignItems: "flex-end",
              }}
            >
              <h4 className="pb-2" style={{ borderBottom: "1px solid #ededed" }}>
                RELATED PRODUCTS
              </h4>
              {relatedProducts.map((data, i) => {
                return (
                  <Product
                    grid="col-6 col-sm-6 col-md-4 col-lg-2 mb-5"
                    key={i}
                    data={data}
                  ></Product>
                );
              })}
            </motion.div>
            <div className="row mt-3" >
              <div className="col-12 ps-0 pe-0">
                <Image src={sliderImage5} alt="slider" width="100%" />
              </div>
            </div>
            {recentlyViewed.products == null ? (
              ""
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                className="row p-4 mt-3 "
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
                  borderRadius: "5px",
                  alignItems: "flex-end",
                }}
              >
                <h4
                  className="pb-2"
                  style={{
                    borderBottom: "1px solid #ededed",
                    textTransform: "uppercase",
                  }}
                >
                  recently viewed
                </h4>
                {recentlyViewed.products
                  .map((data, i) => {
                    if (i < 6) {
                      return (
                        <Product
                          grid="col-6 col-sm-6 col-md-4 col-lg-2 mb-5"
                          key={i}
                          data={data}
                        ></Product>
                      );
                    }
                  })}
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { category } = context.params
  return {
    props: {

    }, // will be passed to the page component as props
  }
}

export default SingleProduct;
