import '../styles/globals.css'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify';
// import { SessionProvider } from "next-auth/react"
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react';
// import NavBar from '../componants/NavBar'
import { Provider, useDispatch, useSelector } from "react-redux";
// import store from '../redux/store'
import Footer from '../componants/Footer'
import { getUser, userState } from '../redux/features/user/userSlice';

import store from '../redux/store';
import { SessionProvider } from 'next-auth/react';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../componants/NavBar'),
  { ssr: false } // <-- not including this component on server-side
)
function MyApp({
  Component,
  pageProps: { session, ...pageProps }, }) {
  // const dispatch = useDispatch()
  useEffect(() => {
  console.log(1)
  // dispatch(getUser())
  //   import("bootstrap/dist/js/bootstrap");
  //   import('../componants/NavBar');
  }, []);

  return <>
    <Provider store={store}>
      <ToastContainer />
      <DynamicComponentWithNoSSR />
      <Component {...pageProps} />
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