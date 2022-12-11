import React, { useState } from 'react'
import { TextField } from '@mui/material';

const Inquiries = () => {
  const [formValue, setFormValue] = useState({
    fName: '',
    lName: '',
    phone: '',
    state: '',
    street: '',
    building: '',
    floor: '',
    apartment: '',
    city: '',
    issue: '',
    deviceName : '',
    orderNumber : '',
  });
  const [formIsTouched, setFormIsTouched] = useState({
    fName: false,
    lName: false,
    phone: false,
    state: false,
    street: false,
    building: false,
    floor: false,
    apartment: false,
    city: false,
    issue: false,
    deviceName : false,
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    setFormIsTouched({ ...setFormIsTouched, [e.target.name]: true });
  };

  const submitFormHandler = ()=>{
    if (
      formValue.fName.trim() === '' ||
      formValue.lName.trim() === '' ||
      formValue.issue.trim() === '' ||
      formValue.deviceName.trim() === '' ||
      formValue.state.trim() === '' ||
      formValue.street.trim() === '' ||
      formValue.building.trim() === '' ||
      formValue.floor.trim() === '' ||
      formValue.apartment.trim() === '' ||
      formValue.city.trim() === '' ||
      formValue.phone.trim().length <= 10 
    ){
      // for(const el in formIsTouched){
        setFormIsTouched({
            // prev=>
            fName: true,
              lName: true,
              issue : true,
              deviceName : true,
              phone: true,
              state: true,
              street: true,
            building: true,
            floor: true,
            apartment: true,
            city: true,
            extra: true,
          
        })
      // }
      return
    }
  }

     // console.log(formIsTouched)
    // console.log(!formValue.email.includes('@') && formIsTouched.email === true)
    return (
      <div
      style={{
        // position : 'fixed',
        // top : 0,
        // left : 0,
        // height : '100vh',
        // width : '100%',
        background : "#f2f2f2",
        // zIndex : 5,
        display : 'flex',
        padding : '12rem 0 0 0',
        // overflow : 'scroll'
  
      //   // alignItems : 'center',
      //   // justifyContent : 'center'
      }}
      >
        <div
        className="container Form__container"
        style={{
          display: 'grid',
          gridColumnGap: '1rem',
          // alignItems  : 'center',
        }}
        >
          <TextField
          className='form__input'
            error={formValue.fName.trim() === '' && formIsTouched.fName === true ? true : false}
            name='fName'
            id="fName"
            label="First Name"
            defaultValue=""
            onChange={onChange}
            value={formValue.fName}
            helperText="Required"
          />
          <TextField
          className='form__input'
            error={formValue.lName.trim() === '' && formIsTouched.lName === true ? true : false}
            name='lName'
            id="lName"
            label="Last Name"
            defaultValue=""
            onChange={onChange}
            value={formValue.lName}
            helperText="Required"
          />
                    <TextField
          className='form__input'
            name='orderNumber'
            id="orderNumber"
            label="Order Number"
            defaultValue=""
            onChange={onChange}
            value={formValue.orderNumber}
          />
                    <TextField
          className='form__input'
            error={formValue.issue.trim() === '' && formIsTouched.issue === true ? true : false}
            name='issue'
            id="issue"
            label="Issue"
            defaultValue=""
            onChange={onChange}
            value={formValue.issue}
            helperText="Required"
          />
                    <TextField
          className='form__input'
            error={formValue.deviceName.trim() === '' && formIsTouched.deviceName === true ? true : false}
            name='deviceName'
            id="deviceName"
            label="Device Name"
            defaultValue=""
            onChange={onChange}
            value={formValue.deviceName}
            helperText="Required"
          />
          <TextField
          className='form__input'
            error={formValue.phone.trim().length <= 10 && formIsTouched.phone === true ? true : false}
            name='phone'
            id="phone"
            label="Phone"
            defaultValue=""
            onChange={onChange}
            value={formValue.phone}
            helperText="Required"
          />
          <TextField
          className='form__input'
            error={formValue.state.trim() === '' && formIsTouched.state === true ? true : false}
            name='state'
            id="state"
            label="State"
            defaultValue=""
            onChange={onChange}
            value={formValue.state}
            helperText="Required"
          />
          <TextField
          className='form__input'
            error={formValue.street.trim() === '' && formIsTouched.street === true ? true : false}
            name='street'
            id="street"
            label="Street"
            defaultValue=""
            onChange={onChange}
            value={formValue.street}
            helperText="Required"
          />
          <TextField
          className='form__input'
            error={formValue.building.trim() === '' && formIsTouched.building === true ? true : false}
            name='building'
            id="building"
            label="Street"
            defaultValue=""
            onChange={onChange}
            value={formValue.building}
            helperText="Required"
          />
          <TextField
          className='form__input'
            error={formValue.floor.trim() === '' && formIsTouched.floor === true ? true : false}
            name='floor'
            id="floor"
            label="Floor"
            defaultValue=""
            onChange={onChange}
            value={formValue.floor}
            helperText="Required"
          />
          <TextField
          className='form__input'
            error={formValue.apartment.trim() === '' && formIsTouched.apartment === true ? true : false}
            name='apartment'
            id="apartment"
            label="Apartment"
            defaultValue=""
            onChange={onChange}
            value={formValue.apartment}
            helperText="Required"
          />
          <TextField
          className='form__input'
            error={formValue.city.trim() === '' && formIsTouched.city === true ? true : false}
            name='city'
            id="city"
            label="City"
            defaultValue=""
            onChange={onChange}
            value={formValue.city}
            helperText="Required"
          />
          <TextField
          className='form__input'
            name='extra'
            id="extra"
            label="Extra Description"
            defaultValue=""
            onChange={onChange}
            value={formValue.extra}
          />
        <button className='btn btn-primary p-3 ' onClick={submitFormHandler} type='submit'>Submit</button>
        </div>
      </div>
  )
}

export default Inquiries