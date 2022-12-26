import React, { useEffect } from 'react'

import { TextField, withStyles } from '@mui/material';
import AccountLayout from '../../../Layout/Account';

import style from './Information.module.css'
import { useState } from 'react';
import useInput from '../../../hooks/use-input';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, userState } from '../../../redux/features/user/userSlice';
import axios from 'axios';
// import devnull from 'dev-null';
import Button from '../../../componants/Account/Button/Button';
import API_URL from '../../../API/ApiUrl';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { sidebarActions, sidebarState } from '../../../redux/features/user/sidebarSlice';
import Overlay from '../../../componants/Overlay.jsx/Overlay';
axios.defaults.withCredentials = true
const AccountInformation = () => {
  const dispatch = useDispatch();
  const user = useSelector(userState);
  const {isOpened} = useSelector(sidebarState)
  const [isLoading, setIsLoading] = useState(false);
  const openSidebarHandler = () => {
    dispatch(sidebarActions.open())
  }
  useEffect(() => {
    if (!user.user)
      dispatch(getUser())
  }, [dispatch]);
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    isChanged: enteredFirstNameIsChanged,
    hasError: firstNameHasError,
    setValueHandler: setFirstName,
    onChangeHandler: onChangeFirstNameHandler,
    onBlurHandler: onBlurFirstNameHandler,
    resetInputHandler: resetFirstNameInput

  } = useInput((value) => value.trim().length > 0, user?.user?.firstName);
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    isChanged: enteredLastNameIsChanged,
    hasError: lastNameHasError,
    setValueHandler: setLastName,
    onChangeHandler: onChangeLastNameHandler,
    onBlurHandler: onBlurLastNameHandler,
    resetInputHandler: resetLastNameInput
  } = useInput((value) => value.trim().length > 0, user?.user?.firstName);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    isChanged: enteredEmailIsChanged,
    hasError: emailHasError,
    setValueHandler: setEmail,
    onChangeHandler: onChangeEmailHandler,
    onBlurHandler: onBlurEmailHandler,
    resetInputHandler: resetEmailInput
  } = useInput((value) => !!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/), user?.user?.email);

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    isChanged: enteredPhoneIsChanged,
    hasError: phoneHasError,
    onChangeHandler: onChangePhoneHandler,
    onBlurHandler: onBlurPhoneHandler,
    resetInputHandler: resetPhoneInput
  } = useInput((value) => value.trim().length > 0, user?.user?.phone);
  const {
    value: enteredState,
    isValid: enteredStateIsValid,
    isChanged: enteredStateIsChanged,
    hasError: stateHasError,
    onChangeHandler: onChangeStateHandler,
    onBlurHandler: onBlurStateHandler,
    resetInputHandler: resetStateInput
  } = useInput((value) => value.trim().length > 0, user?.user?.state);
  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    isChanged: enteredCityIsChanged,
    hasError: cityHasError,
    onChangeHandler: onChangeCityHandler,
    onBlurHandler: onBlurCityHandler,
    resetInputHandler: resetCityInput
  } = useInput((value) => value.trim().length > 0, user?.user?.city);
  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    isChanged: enteredStreetIsChanged,
    hasError: streetHasError,
    onChangeHandler: onChangeStreetHandler,
    onBlurHandler: onBlurStreetHandler,
    resetInputHandler: resetStreetInput
  } = useInput((value) => value.trim().length > 0, user?.user?.street);
  const {
    value: enteredBuilding,
    isValid: enteredBuildingIsValid,
    isChanged: enteredBuildingIsChanged,
    hasError: buildingHasError,
    onChangeHandler: onChangeBuildingHandler,
    onBlurHandler: onBlurBuildingHandler,
    resetInputHandler: resetBuildingInput
  } = useInput((value) => value.trim().length > 0, user?.user?.building);
  const {
    value: enteredFloor,
    isValid: enteredFloorIsValid,
    isChanged: enteredFloorIsChanged,
    hasError: floorHasError,
    onChangeHandler: onChangeFloorHandler,
    onBlurHandler: onBlurFloorHandler,
    resetInputHandler: resetFloorInput
  } = useInput((value) => value.trim().length > 0, user?.user?.floor);
  const {
    value: enteredApartment,
    isValid: enteredApartmentIsValid,
    isChanged: enteredApartmentIsChanged,
    hasError: apartmentHasError,
    onChangeHandler: onChangeApartmentHandler,
    onBlurHandler: onBlurApartmentHandler,
    resetInputHandler: resetApartmentInput
  } = useInput((value) => value.trim().length > 0, user?.user?.apartment);

  let formIsValid = false;
  //check if form is valid
  if (enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredPhoneIsValid &&
    enteredStateIsValid &&
    enteredCityIsValid &&
    enteredStreetIsValid &&
    enteredBuildingIsValid &&
    enteredFloorIsValid &&
    enteredApartmentIsValid
  )
    formIsValid = true;

  const updateUserHandler = async () => {
    // set is loading state to true
    setIsLoading(true)
    // set tost to loading
    const formToast = toast.loading("Updating your information...")
    const firstName = enteredFirstName;
    const lastName = enteredLastName;
    const email = enteredEmail;
    const phone = enteredPhone
    const state = enteredState
    const city = enteredCity
    const street = enteredStreet
    const building = enteredBuilding
    const floor = enteredFloor
    const apartment = enteredApartment

    try {
      await axios.patch(`${API_URL}/users`, {
        firstName,
        lastName,
        email,
        phone,
        state,
        city,
        street,
        building,
        floor,
        apartment,
      })
      toast.update(formToast,
        {
          render: "Your information has been updated",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          isLoading: false,
          type: toast.TYPE.SUCCESS,
          closeButton: true,
        }
      )
    } catch (e) {
      toast.update(formToast,
        {
          render: e.message,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          isLoading: false,
          type: toast.TYPE.ERROR,
          closeButton: true,
        })
    }
    setIsLoading(false)
  }
  const onChangeFormHandler = () => {
    // setIsChanged(true)
  }
  const isChanged =
    enteredFirstNameIsChanged ||
    enteredLastNameIsChanged ||
    enteredEmailIsChanged ||
    enteredPhoneIsChanged ||
    enteredStateIsChanged ||
    enteredCityIsChanged ||
    enteredStreetIsChanged ||
    enteredBuildingIsChanged ||
    enteredFloorIsChanged ||
    enteredApartmentIsChanged;
    
  return (
    <div className={style.pageContainer}>
      {isOpened ? <Overlay /> : null}
      <div className={style.headerContainer}>
      <FontAwesomeIcon className={style.gearIcon} icon={faGear} onClick={openSidebarHandler}/>
        <h2 className={style.header}>General Information</h2>
      </div>
      <div className={`${style.generalInformation} `} >
        <TextField
          className={`${style.TextField} ${firstNameHasError ? style.TextFieldError : ''}`}
          id="firstName"
          value={enteredFirstName}
          error={firstNameHasError}
          helperText={firstNameHasError ? "This field is required" : ""}
          onChange={onChangeFirstNameHandler}
          onBlur={onBlurFirstNameHandler}
          label="First name"
          variant="outlined"
        />
        <TextField
          className={`${style.TextField} ${lastNameHasError ? style.TextFieldError : ''}`}
          id="lastName"
          value={enteredLastName}
          error={lastNameHasError}
          helperText={lastNameHasError ? "This field is required" : ""}
          onChange={onChangeLastNameHandler}
          onBlur={onBlurLastNameHandler}
          label="Last name"
          variant="outlined"
        />
        <TextField
          className={`${style.TextField} ${emailHasError ? style.TextFieldError : ''}`}
          id="email"
          value={enteredEmail}
          error={emailHasError}
          helperText={emailHasError ? "Email is not valid" : ""}
          onChange={onChangeEmailHandler}
          onBlur={onBlurEmailHandler}
          label="Email"
          variant="outlined"
        />
        <TextField
          className={`${style.TextField} ${phoneHasError ? style.TextFieldError : ''}`}
          id="phone"
          value={enteredPhone}
          error={phoneHasError}
          helperText={phoneHasError ? "This field is required" : ""}
          onChange={onChangePhoneHandler}
          onBlur={onBlurPhoneHandler}
          label="Phone"
          variant="outlined"
        />

      </div>
      <div className={`${style.headerContainer2} ${style.subHeader}`}>
        <h4 className={`${style.header}`}>Address</h4>
      </div>
      <div className={`${style.generalInformation} ${style.addressInformation} `}>
        <TextField
          className={`${style.TextField} ${stateHasError ? style.TextFieldError : ''}`}
          id="state"
          value={enteredState}
          error={stateHasError}
          helperText={stateHasError ? "This field is required" : ""}
          onChange={onChangeStateHandler}
          onBlur={onBlurStateHandler}
          label="State"
          variant="outlined"
        />
        <TextField
          className={`${style.TextField} ${cityHasError ? style.TextFieldError : ''}`}
          id="city"
          value={enteredCity}
          error={cityHasError}
          helperText={cityHasError ? "This field is required" : ""}
          onChange={onChangeCityHandler}
          onBlur={onBlurCityHandler}
          label="City"
          variant="outlined"
        />
        <TextField
          className={`${style.TextField} ${streetHasError ? style.TextFieldError : ''}`}
          id="street"
          value={enteredStreet}
          error={streetHasError}
          helperText={streetHasError ? "This field is required" : ""}
          onChange={onChangeStreetHandler}
          onBlur={onBlurStreetHandler}
          label="Street"
          variant="outlined"
        />
        <TextField
          className={`${style.TextField} ${buildingHasError ? style.TextFieldError : ''}`}
          id="building"
          value={enteredBuilding}
          error={buildingHasError}
          helperText={buildingHasError ? "This field is required" : ""}
          onChange={onChangeBuildingHandler}
          onBlur={onBlurBuildingHandler}
          label="Building"
          variant="outlined"
        />
        <TextField
          className={`${style.TextField} ${floorHasError ? style.TextFieldError : ''}`}
          id="floor"
          value={enteredFloor}
          error={floorHasError}
          helperText={floorHasError ? "This field is required" : ""}
          onChange={onChangeFloorHandler}
          onBlur={onBlurFloorHandler}
          label="Floor"
          variant="outlined"
        />
        <TextField
          className={`${style.TextField} ${apartmentHasError ? style.TextFieldError : ''}`}
          id="apartment"
          value={enteredApartment}
          error={apartmentHasError}
          helperText={apartmentHasError ? "This field is required" : ""}
          onChange={onChangeApartmentHandler}
          onBlur={onBlurApartmentHandler}
          label="Apartment"
          variant="outlined"
        />

      </div>

      <div className={style.buttonsContainer}>
        <Button
          text={isLoading ? 'saving' : 'save'}
          disabled={!formIsValid || isLoading || !isChanged}
          onClickHandler={updateUserHandler}
        />
        <Button
          text="Change Password"
        />
      </div>
    </div>
  )
}


AccountInformation.PageLayout = AccountLayout;
export default AccountInformation