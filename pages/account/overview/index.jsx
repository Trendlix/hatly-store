import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import API_URL from '../../../API/ApiUrl'

// import AccountSidebar from '../../../componants/Account/AccountSidebar/AccountSidebar'
import Overview from '../../../componants/Account/Overview/Overview'
import AccountLayout from '../../../Layout/Account'
import { getUser } from '../../../redux/features/user/userSlice'
// import style from './Account.module.css'

axios.defaults.withCredentials = true

const AccountOverview = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, []);
  return (
    // <div className={`${style.page_container} container`}>
    // <AccountSidebar />
    
      <Overview />
    // </div>
  )
}
AccountOverview.PageLayout = AccountLayout;

export default AccountOverview

export async function getServerSideProps(context) {
  const token = context.req.cookies.access_token
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  return {
    props: {}, // will be passed to the page component as props
  }
}