// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "../redux/alertReducer";
const scrollTop = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
};



const Alert = (props) => {
    const alert = useSelector((state) => state.alert.data);
    const dispatch = useDispatch()
    return (
        <motion.div
            initial={{ y: "-200%" }}
            animate={{ y: alert.y }}
            exit={{ x: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 2,
                repeatDelay: 1,
            }}
            className='col-12 m-auto' style={{ position: "fixed", top: '4vh', zIndex: '9999' }} align="center">
            <div className='col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3' style={{ boxShadow: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)' }}>
                <div className='container-fluid bg-white'>
                    <div className='row justify-content-between align-items-center p-3' style={{ backgroundColor: '#384a8c', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)' }}>
                        <h5 className='col text-start m-0 text-white'>{alert.header}</h5>
                        <a href="#1" onClick={() => {
                            dispatch(
                                showAlert({
                                    y: '-200%'
                                })
                            )
                        }} className="text-danger col-auto mt-1" >X</a>
                    </div>
                    <div className='row p-2 mt-4 '>
                        <div className='col-3'>
                            <FontAwesomeIcon style={{ fontSize: '50px', color: '#20c997' }}
                                icon={alert.icon1}
                            ></FontAwesomeIcon>
                        </div>
                        <div className='col-9'>
                            <p className='description text-start'>{alert.description}</p>
                        </div>
                    </div>
                    <div className='row justify-content-around p-3'>
                        <Link onClick={() => {
                            dispatch(
                                showAlert({
                                    y: '-200%'
                                })
                            )
                            scrollTop()
                        }} to={`/shop/all`} className="btn text-white col-6 col-md-8 mt-1" style={{ background: '#384a8c' }}>
                            <FontAwesomeIcon
                                className="col"
                                icon={alert.icon2}
                            ></FontAwesomeIcon> Back to Shop</Link>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default Alert