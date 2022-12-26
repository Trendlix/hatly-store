import React from 'react';
import AccountHeader from '../AccountHeader/AccountHeader';
import NavButtons from '../NavButtons/NavButtons';
import NavItems from '../NavItems/NavItems';

import style from './AccountSidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { sidebarActions } from '../../../redux/features/user/sidebarSlice';

const AccountSidebar = () => {
  const dispatch = useDispatch()
  const closeSidebarHandler = () => {
    dispatch(sidebarActions.close())
  }
  return (
    <div className={style.sidebar}>
      <FontAwesomeIcon icon={faXmark} className={style.close} onClick={closeSidebarHandler}/>
      <AccountHeader />
      <div className={style.sidebar_container}>
        <NavItems />
        <NavButtons />
      </div>
    </div>
  )
}

export default AccountSidebar