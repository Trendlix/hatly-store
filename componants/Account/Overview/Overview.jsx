import Image from 'next/image';
import React from 'react';

import style from './Overview.module.css';
import bitmoji from '../../../img/bitmoji.png';
import { useSelector } from 'react-redux';
import { userState } from '../../../redux/features/user/userSlice';

const Overview = () => {
  const user = useSelector(userState)
  return (
    <div className={style.overview}>
      <div className={style.background}>
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
    </div>
  )
}

export default Overview