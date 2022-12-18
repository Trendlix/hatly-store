import React from 'react';

import style from './Button.module.css';

const Button = ({ text, onClickHandler, disabled, ...props }) => {
  return (
    <button
      {...props}
      className={`${style.btn} ${disabled ? style.disabled : style.active}`}
      onClick={onClickHandler}
      disabled ={disabled}
      >
      {text}
    </button>
  )
}

export default Button