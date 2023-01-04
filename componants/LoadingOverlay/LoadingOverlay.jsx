import React from 'react';
// import { DotLoader } from 'react-spinners';
// import {useSelector} from 'react-redux';

import style from './LoadingOverlay.module.css';
// import { userState } from '../../redux/features/user/userSlice';

const LoadingOverlay = () => {
  // const user = useSelector(userState)
  // console.log(user.loading)
  return (
    // <div className={`${style.overlay_container} ${user.loading ? style.loading : ''}`}>
    <div className={`${style.overlay_container}`}>
      <span className={style.loader}></span>
      {/* <DotLoader
      className={style.loading_spinner}
        color="#699eef"
        size={80}
        speedMultiplier={0.8}
      /> */}
    </div>
  )
}

export default LoadingOverlay