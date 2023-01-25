import React from 'react';

import style from './PolicyItem.module.css';

const PolicyItem = ({ title, description }) => {
  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.description}>{description}</p>
    </div>
  )
}

export default PolicyItem