import React from 'react'
import AccountSidebar from '../../componants/Account/AccountSidebar/AccountSidebar'

import style from './Account.module.css'

const AccountLayout = ({ children }) => {
  return (
    <div className={`${style.page_container} container`}>
      <AccountSidebar />
      {children}
    </div>
  )
}

export default AccountLayout