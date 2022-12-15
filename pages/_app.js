import '../styles/globals.css'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import Footer from '../componants/Footer'
import { getUser, userState } from '../redux/features/user/userSlice';

import store from '../redux/store';

const NavbarWithNoSSR = dynamic(
  () => import('../componants/NavBar'),
  { ssr: false } // <-- not including this component on server-side
)
function MyApp({
  Component,
  pageProps: { session, ...pageProps }, }) {
  // const dispatch = useDispatch()
  // useEffect(() => {
  // console.log(1)
  // dispatch(getUser())
  // }, []);

  return <>
    <Provider store={store}>
      <ToastContainer />
      <NavbarWithNoSSR />
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
      <Footer />
    </Provider>
  </>

}

export default MyApp

// export async function getInitialProps(context) {
// console.log(1)
  // const session = await getSession(context)

  // return {
    // props: {}, // will be passed to the page component as props
  // }
// 
// }