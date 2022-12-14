import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./NavItem.module.css";

const NavItem = ({ name, icon, link }) => {
  return (
    <li className={style.nav_item}>
      <Link className={style.link} href={link}>
        <FontAwesomeIcon
          icon={icon}
        />
        <span>{name}</span>
      </Link>
    </li>
  )
}

export default NavItem