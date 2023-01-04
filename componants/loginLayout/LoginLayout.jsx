import React from 'react'

import { motion } from 'framer-motion'
import banner from '../../img/login-banner1.png'
import overlay from '../../img/login-banner-overlay.png'
import style from '../../styles/loginLayout.module.css'
import { useSelector } from 'react-redux'
import { userState } from '../../redux/features/user/userSlice'
import Image from 'next/image'
const LoginLayout = props => {
  const { isAuthenticated } = useSelector(userState);
  console.log(isAuthenticated)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: isAuthenticated ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={`pb-5 ${style.pageContainer}`}
    >
      <div className={`container ${style.wrapper}`}>
        <div className={style.login_wrapper}>
          <div className={`${style.image_container} ${style.child}`}>
            <Image src={banner} alt="banner" className={style.login_banner} />
            <Image src={overlay} alt="banner" className={style.login_banner_overlay} />
          </div>
          {props.children}
        </div>
      </div>
    </motion.div>
  )
}

export default LoginLayout