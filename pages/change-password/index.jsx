import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import Link from 'next/link'
import { useRouter } from 'next/router'
import useInput from '../../hooks/use-input'
import LoginLayout from '../../componants/loginLayout/LoginLayout'
import { getUser, userActions, userState } from '../../redux/features/user/userSlice'
import API_URL from '../../API/ApiUrl'

import style from '../../styles/loginLayout.module.css'
import LoadingOverlay from '../../componants/LoadingOverlay/LoadingOverlay';
import { useDispatch } from 'react-redux';
axios.defaults.withCredentials = true
const index = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { token } = router.query

  const [loading, setLoading] = useState(false)
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    onChangeHandler: onChangePasswordHandler,
    onBlurHandler: onBlurPasswordHandler,
    hasError: passwordHasError,
    resetInputHandler: resetPasswordInput
  } = useInput((value) => value.length > 8);
  const {
    value: enteredPasswordConfirmation,
    isValid: enteredPasswordConfirmationIsValid,
    hasError: passwordConfirmationHasError,
    onChangeHandler: onChangePasswordConfirmationHandler,
    onBlurHandler: onBlurPasswordConfirmationHandler,
    resetInputHandler: resetPasswordConfirmationInput
  } = useInput((value) => value === enteredPassword);

  let formIsValid = false;
  if (enteredPasswordIsValid && enteredPasswordConfirmationIsValid)
    formIsValid = true;


  const resetPasswordHandler = async () => {
    try {
      setLoading(true);
      const password = enteredPassword;

      // const req = await axios.post(`/api/login`, {
      await axios.patch(`${API_URL}/users/resetPassword/${token}`, {
        Headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
        password
      })
      toast.success('Password changed successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(getUser())
      router.push('/account/overview')
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
      onBlurPasswordHandler();
      onBlurPasswordConfirmationHandler();
      if (!formIsValid)
        return;
      await resetPasswordHandler();
      resetPasswordInput();
      resetPasswordConfirmationInput();
    } catch (e) {
      console.log(e)
    }
    setLoading(false);
  }
  return (
    <LoginLayout>
      {loading && <LoadingOverlay isFullPage={true} />}
      <div className={`${style.login_card} ${style.child}`}>
        <h3 className={`${style.title}`}>Choose a new password</h3>
        <p className={`${style.paragraph}`}>Create a new password that is at least 8 characters long</p>
        <div className={`${style.form}`}>
          <form onSubmit={SubmitLoginHandler}>
            <div className={`${style.inputs_container}`}>
              <div className={`${style.input_wrapper} ${passwordHasError ? `${style.error}` : ''}`}>
                <input
                  className={`${style.input} ${passwordHasError ? `${style.error}` : ''}`}
                  type="password"
                  placeholder='Password'
                  value={enteredPassword}
                  onChange={onChangePasswordHandler}
                  onBlur={onBlurPasswordHandler}
                />
                {passwordHasError && <p className={style.text_error}>Password must be more than 8 characters</p>}
              </div>
              <div className={`${style.input_wrapper} ${passwordConfirmationHasError ? `${style.error}` : ''}`}>
                <input
                  className={`${style.input} ${passwordConfirmationHasError ? `${style.error}` : ''}`}
                  type="password"
                  placeholder='Confirm Password'
                  value={enteredPasswordConfirmation}
                  onChange={onChangePasswordConfirmationHandler}
                  onBlur={onBlurPasswordConfirmationHandler}
                />
                {passwordConfirmationHasError && <p className={style.text_error}>Password must be matched</p>}
              </div>
              <div className={`${style.btn_wrapper} ${style.right}`}>
                <button
                  className={`${style.primary_btn}`}
                  disabled={!formIsValid}
                >
                  Submit
                </button>
              </div>
            </div>


          </form>
        </div>
        {/* <p className={`${style.sign_up__text}`}><Link className={`${style.back}`} href='/login'>Back</Link></p> */}
      </div>
    </LoginLayout>
  )
}

export async function getServerSideProps(context) {
  const token = context.req.cookies.access_token
  const resetToken = context.query.token
  if (token || !resetToken)
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