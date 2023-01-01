import Image from 'next/image';
import React from 'react';
import { useDispatch } from "react-redux";
import { motion } from 'framer-motion';
import style from './Overview.module.css';
import bitmoji from '../../../img/bitmoji.png';
import { useSelector } from 'react-redux';
import { userState } from '../../../redux/features/user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { sidebarActions, sidebarState } from '../../../redux/features/user/sidebarSlice';
import Overlay from '../../Overlay.jsx/Overlay';
import dashboardAnimation from '../../../utils/dashboardAnimation';

const Overview = () => {
  const user = useSelector(userState)
  const { isOpened } = useSelector(sidebarState)
  const dispatch = useDispatch()
  const openSidebarHandler = () => {
    dispatch(sidebarActions.open())
  }
  return (
    <motion.div
    className={style.overview}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={dashboardAnimation.variants}
      transition={dashboardAnimation.transition}
    >
      {isOpened ? <Overlay /> : null}
      <div className={style.background}>
        <FontAwesomeIcon onClick={openSidebarHandler} className={style.gearIcon} icon={faGear} />
        <h2 className={style.header}>Account Overview</h2>
      </div>
      <div className={style.accountDataContainer}>
        <div className={style.imgContainer}>
          <Image
            className={style.img}
            src={bitmoji}
            alt="bitmoji"
            width="100%"
          />
        </div>
        <p className={style.welcome}>Welcome</p>
        <p className={style.username}>{user?.user?.firstName} {user?.user?.lastName}</p>
      </div>
      <div className={style.userDataContainer}>
        <div className={style.dataCard}>
          <p className={style.title}>ID</p>
          <p className={style.data}>{user?.user?._id}</p>
        </div>
        <div className={style.dataCard}>
          <p className={style.title}>Loyalty Points</p>
          {/* <p>{user?.user?._id}</p> */}
          <p className={style.data}>450</p>
        </div>
      </div>
      </motion.div>
  )
}

export default Overview