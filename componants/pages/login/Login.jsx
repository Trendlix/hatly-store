import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch ,useSelector} from 'react-redux'

import useInput from '../../../hooks/use-input'
import LoginLayout from '../../loginLayout/LoginLayout'
import { userActions, userState } from '../../../redux/features/user/userSlice'
import API_URL from '../../../API/ApiUrl'
import { syncCart } from '../../../redux/cartRedux';

axios.defaults.withCredentials = true
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector(userState)
  useEffect(()=>{
    if(user.isAuthenticated)
    navigate('/' , {replace : true})
  },[navigate ,user])
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
        dispatch(syncCart());
        navigate('/' , {replace : true})
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
      <div className="login_card child">
        <h3 className='title'>Login</h3>
        <div className="form">
          <form onSubmit={SubmitLoginHandler}>
            <div className="inputs_container">
              <div className={`input_wrapper ${emailHasError ? 'error' : ''}`}>
                <input
                  className={`input ${emailHasError ? 'error' : ''}`}
                  type="text"
                  placeholder='Email'
                  onBlur={onBlurEmailHandler}
                  onChange={onChangeEmailHandler}
                  value={enteredEmail}
                />
                {emailHasError && <p className='text_error'>Enter email is not valid</p>}
              </div>
              <div className={`input_wrapper ${passwordHasError ? 'error' : ''}`}>
                <input
                  className={`input ${passwordHasError ? 'error' : ''}`}
                  type="password"
                  placeholder='Password'
                  onBlur={onBlurPasswordHandler}
                  onChange={onChangePasswordHandler}
                  value={enteredPassword}
                />
                {passwordHasError && <p className='text_error'>Password must be more than 8 characters</p>}
              </div>
            </div>
            <p className='reset_password'>
              <a className='reset_password__link' href="#1">
                Forgot your password?
              </a>
            </p>
            <div className="btn_wrapper">
              <button
                className='primary_btn'
                disabled={!formIsValid}
              >
                Login
              </button>
              <p onClick={test}>test</p>
            </div>
          </form>
        </div>
        <p className='sign_up__text'>Don't have an account? <Link className='signUp' to='/signup'>sign up now</Link></p>
      </div>
    </LoginLayout>
  )
}

export default Login