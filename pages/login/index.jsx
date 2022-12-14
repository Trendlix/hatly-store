import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useDispatch ,useSelector} from 'react-redux'
import { getSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import useInput from '../../hooks/use-input'
import LoginLayout from '../../componants/loginLayout/LoginLayout'
import { userActions, userState } from '../../redux/features/user/userSlice'
import API_URL from '../../API/ApiUrl'

import style from '../../styles/loginLayout.module.css'
axios.defaults.withCredentials = true
const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    onChangeHandler: onChangeEmailHandler,
    onBlurHandler: onBlurEmailHandler,
    resetInputHandler: resetEmailInput
  } = useInput((value) => !!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/));
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    onChangeHandler: onChangePasswordHandler,
    onBlurHandler: onBlurPasswordHandler,
    resetInputHandler: resetPasswordInput
  } = useInput((value) => value.trim().length > 8);

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid)
    formIsValid = true;
  // console.log(formIsValid)
  // console.log(enteredEmailIsValid)
  // console.log(enteredPasswordIsValid)
  
  const login = async () => {
    try {
      dispatch(userActions.loggingIn())
      const email = enteredEmail;
      const password = enteredPassword;
      const req = await axios.post(`${API_URL}/users/login`, {
        Headers: {
          "Accept" : "*/*", 
          "Content-Type": "application/json",
        },
          email,
          password
      })
      // const status = await signIn('credentials', {
        // redirect: false,
        // email,
        // password,
        // callbackUrl: "/"
    // })
    
    // console.log(status)
      toast.success('Logged in successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        dispatch(userActions.loginSuccess({user : req.data.body}))
        router.push('/account/overview')
        // if(!status.error)
        // navigate('/',{replace : true})
      // console.log(req.data)
    } catch (e) {
      dispatch(userActions.loginFailed())
      toast.error('Email or password is incorrect', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.log(e)
      throw new Error('Email or password is incorrect')
    }
  }
  const SubmitLoginHandler = async e => {
    try {
      // prevent browser default
      e.preventDefault();
      //touch all inputs
      onBlurEmailHandler();
      onBlurPasswordHandler();
      if (!formIsValid)
        return;
      await login();
      resetEmailInput();
      resetPasswordInput();
    } catch (e) {
      console.log(e)
    }
  }
  const test = async () => {
    const req = await axios.get(`${API_URL}/users/me`)
    console.log(req.data)
  }
  return (
    <LoginLayout>
      <div className={`${style.login_card} ${style.child}`}>
        <h3 className={`${style.title}`}>Login</h3>
        <div className={`${style.form}`}>
          <form onSubmit={SubmitLoginHandler}>
            <div className={`${style.inputs_container}`}>
              <div className={`${style.input_wrapper} ${emailHasError ? `${style.error}` : ''}`}>
                <input
                  className={`${style.input} ${emailHasError ? `${style.error}` : ''}`}
                  type="text"
                  placeholder='Email'
                  onBlur={onBlurEmailHandler}
                  onChange={onChangeEmailHandler}
                  value={enteredEmail}
                />
                {emailHasError && <p className={`${style.text_error}`}>Enter email is not valid</p>}
              </div>
              <div className={`${style.input_wrapper} ${passwordHasError ? `${style.error}` : ''}`}>
                <input
                  className={`${style.input} ${passwordHasError ? `${style.error}` : ''}`}
                  type="password"
                  placeholder='Password'
                  onBlur={onBlurPasswordHandler}
                  onChange={onChangePasswordHandler}
                  value={enteredPassword}
                />
                {passwordHasError && <p className={`${style.text_error}`}>Password must be more than 8 characters</p>}
              </div>
            </div>
            <p className={`${style.reset_password}`}>
              <a className={`${style.reset_password__link}`} href="#1">
                Forgot your password?
              </a>
            </p>
            <div className={`${style.btn_wrapper}`}>
              <button
                className={`${style.primary_btn}`}
                disabled={!formIsValid}
              >
                Login
              </button>
              <p onClick={test}>test</p>
            </div>
          </form>
        </div>
        <p className={`${style.sign_up__text}`}>Don't have an account? <Link className={`${style.signUp}`} href='/signup'>sign up now</Link></p>
      </div>
    </LoginLayout>
  )
}

export async function getServerSideProps(context) {
  const token = context.req.cookies.access_token
  // const session = await getSession(context)
  // const auth = await axios.get(API_URL + '/users/auth');
  // const token = auth.data.ok
  if(token)
  return{
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
export default Login