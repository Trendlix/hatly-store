import { faArrowRightFromBracket, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../../redux/features/user/userSlice';

import style from './NavButtons.module.css';

const NavButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logoutHandler = ()=>{
    try {
      dispatch(logout())
      toast.success('Logged out successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        // return redirect('/')
        navigate('/',{replace : true , preventScrollReset : false})
    } catch (e) {
      toast.error('Internal error happened', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
  return (
    <ul className={style.buttons_container}>
      <li className={style.button}>
        <Link className={style.link} to="/contact">
          <FontAwesomeIcon
            className="col pe-2"
            icon={faPhone}
          ></FontAwesomeIcon>
          <span>Contact us</span>
        </Link>
      </li>
      <li className={`${style.button} ${style.logout}`} onClick={logoutHandler}>
        <FontAwesomeIcon
          className="col pe-2"
          icon={faArrowRightFromBracket}
        />
        <span>Logout</span>
      </li>
    </ul>
  )
}

export default NavButtons