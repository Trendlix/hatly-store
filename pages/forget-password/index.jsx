import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import Link from 'next/link'
import { useRouter } from 'next/router'
import useInput from '../../hooks/use-input'
import LoginLayout from '../../componants/loginLayout/LoginLayout'
import API_URL from '../../API/ApiUrl'

import style from '../../styles/loginLayout.module.css'
import LoadingOverlay from '../../componants/LoadingOverlay/LoadingOverlay';
axios.defaults.withCredentials = true
const index = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneHasError,
    onChangeHandler: onChangePhoneHandler,
    onBlurHandler: onBlurPhoneHandler,
    resetInputHandler: resetPhoneInput
  } = useInput((value) => !!value.match(/^((\+2)?01[0125]\d{8})$/));

  let formIsValid = false;
  if (enteredPhoneIsValid )
    formIsValid = true;
  

  const resetPasswordHandler = async () => {
    try {
      setLoading(true);
      const phone = enteredPhone;
      
      // const req = await axios.post(`/api/login`, {
      await axios.post(`${API_URL}/users/forgotPassword`, {
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
        phone
      })
      toast.success('Reset password link has been sent to your phone', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    } catch (e) {
      console.log(e)
      toast.error(e.response.data.message || 'Something went wrong', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw new Error(e.response.data.message || 'Something went wrong')
    }
  }
  const SubmitLoginHandler = async e => {
    try {
      // prevent browser default
      e.preventDefault();
      //touch all inputs
      onBlurPhoneHandler();
      if (!formIsValid)
        return;
      await resetPasswordHandler();
      resetPhoneInput();
    } catch (e) {
      console.log(e)
    }
    setLoading(false);
  }
  return (
    <LoginLayout>
      {loading && <LoadingOverlay isFullPage={true} />}
      <div className={`${style.login_card} ${style.child}`}>
        <h3 className={`${style.title}`}>Enter Your Phone Number to Reset Your Password</h3>
        <div className={`${style.form}`}>
          <form onSubmit={SubmitLoginHandler}>
            <div className={`${style.inputs_container}`}>
            <div className={`${style.input_wrapper} ${phoneHasError ? `${style.error}` : ''}`}>
                <input
                  className={`${style.input} ${phoneHasError ? `${style.error}` : ''}`}
                  type="text"
                  placeholder='Phone'
                  value={enteredPhone}
                  onChange={onChangePhoneHandler}
                  onBlur={onBlurPhoneHandler}
                />
                {phoneHasError && <p className={style.text_error}>Phone number is not valid</p>}
              </div>
              
            </div>

            <div className={`${style.btn_wrapper}`}>
              <button
                className={`${style.primary_btn}`}
                disabled={!formIsValid}
              >
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
        <p className={`${style.sign_up__text}`}><Link className={`${style.back}`} href='/login'>Back</Link></p>
      </div>
    </LoginLayout>
  )
}

export async function getServerSideProps(context) {
  const token = context.req.cookies.access_token
  if (token)
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
export default index