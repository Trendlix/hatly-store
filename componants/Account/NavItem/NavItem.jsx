import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./NavItem.module.css";

const NavItem = ({ name, icon, link }) => {
  return (
    <li className={style.nav_item}>
      <NavLink className={style.link} to={link}>
        <FontAwesomeIcon
          icon={icon}
        />
        <span>{name}</span>
      </NavLink>
    </li>
  )
}

export default NavItem