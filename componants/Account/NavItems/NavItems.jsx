import { faCircleInfo, faEye } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import NavItem from '../NavItem/NavItem';

import style from './NavItems.module.css';

const NavItems = () => {
  return (
    <ul className={style.nav_items}>
      <NavItem icon={faEye} name="Overview" link="/account/overview" />
      <NavItem  icon={faCircleInfo} name="Information"  link="/account/information" />
    </ul>
  )
}

export default NavItems