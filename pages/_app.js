import '../styles/globals.css'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react';
// import NavBar from '../componants/NavBar'
import { Provider } from "react-redux";
import store from '../redux/store'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../componants/NavBar'),
  { ssr: false } // <-- not including this component on server-side
)
function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   import("bootstrap/dist/js/bootstrap");
  //   import('../componants/NavBar');
  // }, []);

  return <Provider store={store}>
    <ToastContainer />
  <DynamicComponentWithNoSSR />
  <Component {...pageProps} />
  </Provider>
}

export default MyApp
