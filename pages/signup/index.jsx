import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import useInput from '../../hooks/use-input';
import LoginLayout from '../../componants/loginLayout/LoginLayout'
import API_URL from '../../API/ApiUrl'
import { userActions } from '../../redux/features/user/userSlice';
import style from '../../styles/loginLayout.module.css'
import LoadingOverlay from '../../componants/LoadingOverlay/LoadingOverlay';

axios.defaults.withCredentials = true

const Signup = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading , setLoading] = useState(false);
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameHasError,
    onChangeHandler: onChangeFirstNameHandler,
    onBlurHandler: onBlurFirstNameHandler,
    resetInputHandler: resetFirstNameInput
  } = useInput((value) => value.trim().length > 0);
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameHasError,
    onChangeHandler: onChangeLastNameHandler,
    onBlurHandler: onBlurLastNameHandler,
    resetInputHandler: resetLastNameInput
  } = useInput((value) => value.trim().length > 0);
  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneHasError,
    onChangeHandler: onChangePhoneHandler,
    onBlurHandler: onBlurPhoneHandler,
    resetInputHandler: resetPhoneInput
  } = useInput((value) => !!value.match(/^((\+2)?01[0125]\d{8})$/));
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    onChangeHandler: onChangeEmailHandler,
    onBlurHandler: onBlurEmailHandler,
    resetInputHandler: resetEmailInput
  } = useInput((value) => !!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
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
  //check if form is valid
  if (enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredPhoneIsValid &&
    enteredPasswordIsValid &&
    enteredPasswordConfirmationIsValid
  )
    formIsValid = true;
  // reset inputs form
  const resetForm = () => {
    resetFirstNameInput();
    resetLastNameInput();
    resetPhoneInput();
    resetEmailInput();
    resetPasswordInput();
    resetPasswordConfirmationInput();
  }
  const signUpHandler = async () => {
    try {
      setLoading(true);
      dispatch(userActions.loggingIn())
      const firstName = enteredFirstName;
      const lastName = enteredLastName;
      const email = enteredEmail;
      const phone = enteredPhone;
      const password = enteredPassword;
      const confirmPassword = enteredPasswordConfirmation;
      const req = await axios.post(`${API_URL}/users/signup`, {
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
      }).catch(e => { throw new Error(e.response.data.message) })
      const name = req.data.user.firstName;
      toast.success(`Account created successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // dispatch(userActions.loginSuccess({user : req.data.body}))
      router.push('/login')
    } catch (e) {
      console.log(e)
      dispatch(userActions.loginFailed())
      toast.error(e.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw new Error(e.message);
    }
  }
  const submitFormHandler = async e => {
    try {
      // prevent browser default
      e.preventDefault();
      // touch all inputs
      onBlurFirstNameHandler();
      onBlurLastNameHandler();
      onBlurPhoneHandler();
      onBlurEmailHandler();
      onBlurPasswordHandler();
      onBlurPasswordConfirmationHandler();
      if (!formIsValid)
        return;
      await signUpHandler();
      // reset all inputs
      resetForm();
    } catch (e) {
      console.log(e)
    }
    setLoading(false);

  }
  return (
    <LoginLayout>
      {loading && <LoadingOverlay isFullPage={true}/> }
      <div className={`${style.login_card} ${style.child}`}>
        <h3 className={style.title}>Sign-up</h3>
        <div className={style.form}>
          <form onSubmit={submitFormHandler}>
            <div className={style.inputs_container}>
              <div className={`${style.input_wrapper} ${firstNameHasError ? `${style.error}` : ''}`}>
                <input
                  className={`${style.input} ${firstNameHasError ? `${style.error}` : ''}`}
                  type="text"
                  placeholder='First Name'
                  value={enteredFirstName}
                  onChange={onChangeFirstNameHandler}
                  onBlur={onBlurFirstNameHandler}
                />
                {firstNameHasError && <p className={style.text_error}>This field is required</p>}
              </div>
              <div className={`${style.input_wrapper} ${lastNameHasError ? `${style.error}` : ''}`}>
                <input
                  className={`${style.input} ${lastNameHasError ? `${style.error}` : ''}`}
                  type="text"
                  placeholder='Last Name'
                  value={enteredLastName}
                  onChange={onChangeLastNameHandler}
                  onBlur={onBlurLastNameHandler}
                />
                {lastNameHasError && <p className={style.text_error}>This field is required</p>}
              </div>
              <div className={`${style.input_wrapper} ${emailHasError ? `${style.error}` : ''}`}>
                <input
                  className={`${style.input} ${emailHasError ? `${style.error}` : ''}`}
                  type="text"
                  placeholder='Email'
                  value={enteredEmail}
                  onChange={onChangeEmailHandler}
                  onBlur={onBlurEmailHandler}
                />
                {emailHasError && <p className={style.text_error}>Enter email is not valid</p>}
              </div>
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
            </div>
            <div className={style.btn_wrapper}>
              <button
                className={style.primary_btn}
                disabled={!formIsValid}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <p className={style.sign_up__text}>Have an account? <Link className={style.signUp} href='/login'>Login</Link></p>
      </div>
    </LoginLayout>
  )
}

export default Signup
export async function getServerSideProps(context) {
  const token = context.req.cookies.access_token
  // const session = await getSession(context)
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