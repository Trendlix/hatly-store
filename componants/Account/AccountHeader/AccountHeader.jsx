import React from 'react';

import style from './AccountHeader.module.css';
import bitmoji from '../../../img/bitmoji.png';
import { useSelector } from 'react-redux';
import { userState } from '../../../redux/features/user/userSlice';
import Image from 'next/image';

const AccountHeader = () => {
  const user  = useSelector(userState);
  return (
    <div className={style.container}>
      <div className={style.img_container}>
        <Image
          className={style.img}
          src={bitmoji}
          alt="bitmoji" 
          width="100%"
        />
      </div>
      <div className={style.dataContainer}>
        <h4 className={style.title}>Welcome Back ,</h4>
        <p className={style.username}>{user?.user?.firstName} {user?.user?.lastName}</p>
      </div>
    </div>
  )
}

export default AccountHeader