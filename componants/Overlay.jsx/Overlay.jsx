import React from 'react';

import style from './Overlay.module.css';
import { useDispatch } from 'react-redux';
import { sidebarActions } from '../../redux/features/user/sidebarSlice';

const Overlay = () => {
  const dispatch = useDispatch();

  const closeSidebarHandler = ()=>{
    dispatch(sidebarActions.close())
  }
  return (
    <div className={`${style.overlay_container}`}  onClick={closeSidebarHandler}/>
  )
}

export default Overlay