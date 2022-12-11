import React from 'react'
import { motion } from 'framer-motion'
import image1 from '../../../img/store/1.jpeg'
import image2 from '../../../img/store/2.jpeg'
import image3 from '../../../img/store/3.jpeg'
import image4 from '../../../img/store/4.jpeg'
import image5 from '../../../img/store/5.jpeg'
import image6 from '../../../img/store/6.jpeg'
import image7 from '../../../img/store/7.jpeg'

const OurStore = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }} style={{ backgroundColor: "#ebeef5", paddingTop: '150px' }} className="pb-5">
            <div className="container">
                <div className="row">
                    <div
                        className="col-12 p-4"
                        style={{
                            backgroundColor: "white",
                            boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
                            borderRadius: "5px",
                        }}
                        align="center">
                        <h1 className="text-center">OUR STORE</h1>
                        <p className='description text-center col-10 p-md-4'>Hatly Stores was established in 2014 to make it easier for buyers from Egypt to shop abroad safely with cash on delivery payment method.
                            We are a bunch of passionate experts in different fields who decided to gather our efforts to bring you the best of products shipped from abroad.
                        </p>
                        <div className='row'>
                            <div className='col-md p-2'>
                                <img src={image2} width="100%" alt="hatly store" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md p-2'>
                                <img src={image4} width="100%" alt="hatly store" />
                            </div>
                            <div className='col-md p-2'>
                                <img src={image5} width="100%" alt="hatly store" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md p-2'>
                                <img src={image3} width="100%" alt="hatly store" />
                            </div>
                            <div className='col-md p-2'>
                                <img src={image7} width="100%" alt="hatly store" />
                            </div>
                            <div className='col-md p-2'>
                                <img src={image6} width="100%" alt="hatly store" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div
                        className="col-12 p-4 mt-3"
                        style={{
                            backgroundColor: "white",
                            boxShadow: "0 2px 5px 0 rgb(0 0 0 / 5%)",
                            borderRadius: "5px",
                        }}
                    >
                        <h3 style={{ textTransform: "uppercase" }} className="mb-3">
                            FIND US
                        </h3>
                        <div className="row">
                            <div className="col-12">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.3777891359614!2d31.346443315115387!3d30.054703681878664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f10a06df0d7%3A0x5873ef49645c719c!2sHatly%20Store!5e0!3m2!1sen!2seg!4v1647124962845!5m2!1sen!2seg"
                                    width="100%"
                                    height="450"
                                    loading="lazy"
                                    data-rocket-lazyload="fitvidscompatible"
                                    data-ll-status="loaded"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default OurStore