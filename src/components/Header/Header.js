import React, { useState } from 'react';
import logo from '../../images/header/logo.svg';
import icon from '../../images/header/account-icon.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  // const [loggedIn, setLoggedIn] = useState(false);

  return (
    <header className="header">
      <Link to='/'>
        <img src={logo} alt="Логотип" className="header__logo"/> 
      </Link>
      { props.loggedIn ?
        <nav className="header__login">
          <ul className='header__nav-login'>
            <Link to='/signup' className='header__nav-link'>Фильмы</Link>
            <Link to='/signin' className='header__nav-link'>Сохраненные фильмы</Link>
          </ul>
            <Link to='/profile' className='header__profile'>
              <p>Аккаунт</p>
              <img src={icon} alt="иконка пользователя" className="header__account-icon"/>
            </Link>
        </nav>
        :
        <nav>
          <ul className='header__nav_logout'>
            <Link to='/signup' className='header__link'>Регистрация</Link>
            <Link to='/signin'>
              <button className='header__button'>Войти</button>
            </Link>
          </ul>
        </nav>
      }
    </header>
  );
}
    
export default Header;