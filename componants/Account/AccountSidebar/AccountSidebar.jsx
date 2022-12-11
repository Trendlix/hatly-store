import React from 'react';
import AccountHeader from '../AccountHeader/AccountHeader';
import NavButtons from '../NavButtons/NavButtons';
import NavItems from '../NavItems/NavItems';

import style from './AccountSidebar.module.css';

const AccountSidebar = () => {
  return (
    <div className={style.sidebar}>
      <AccountHeader />
      <div className={style.sidebar_container}>
        <NavItems />
        <NavButtons />
      </div>
    </div>
  )
}

export default AccountSidebar