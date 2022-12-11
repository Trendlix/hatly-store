import React from 'react'

import AccountSidebar from '../../Account/AccountSidebar/AccountSidebar'
import style from './Account.module.css'

const Account = () => {
  return (
    <div className={`${style.page_container} container`}>
      <AccountSidebar />
    </div>
  )
}

export default Account