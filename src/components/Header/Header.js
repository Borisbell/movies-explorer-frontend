import React from 'react';
import logo from '../../images/header/logo.svg';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="header">
      <Link to='/'>
        <img src={logo} alt="Логотип" className="header__logo"/> 
      </Link>
      <nav>
        <ul className='header__nav_logout'>
          <Link to='/signup' className='header__link'>Регистрация</Link>
          <Link to='/signin'>
            <button className='header__button'>Войти</button>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
    
export default Header;