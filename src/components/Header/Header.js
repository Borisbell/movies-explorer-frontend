import React from 'react';
import logo from '../../images/header/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
        <img src={logo} alt="Логотип" className="header__logo"/>
        <nav>
          <ul className='header__nav_logout'>
            <a href='#' className='header__link'>Регистрация</a>
            <button className='header__button'>Войти</button>
          </ul>
        </nav>
    </header>
  );
}
    
export default Header;