import React, { useState } from 'react';
import logo from '../../images/header/logo.svg';
import icon from '../../images/header/account-icon.svg';
import burger from '../../images/header/burger.svg';
import close from '../../images/header/close.svg';
import { Link } from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu';

function Header({loggedIn}) {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [mobileMenuShown, SetMobileMenuShown] = useState(false);
  
  function handleBurgerClick() {
    console.log('burger clicked in header')
    SetMobileMenuShown(!mobileMenuShown);
  }

  return (
    <header className="header">
      <Link to='/'>
        <img src={logo} alt="Логотип" className="header__logo"/> 
      </Link>
      { loggedIn ?
        <div>
          <img src={burger} 
               className="header__login-open" 
               alt="открыть меню"
               onClick={handleBurgerClick} 
               />
          <nav className="header__login">
            <ul className='header__nav-login'>
              <li className='header__nav-item'>
                <Link to='/' className='header__nav-link'>Главная</Link>
              </li>
              <li className='header__nav-item'>
                <Link to='/movies' className='header__nav-link'>Фильмы</Link>
              </li>
              <li className='header__nav-item'>
                <Link to='/saved-movies' className='header__nav-link'>Сохраненные фильмы</Link>
              </li>
              <li className='header__nav-item'>
                <Link to='/profile' className='header__profile'>
                  <p>Аккаунт</p>
                  <img src={icon} alt="иконка пользователя" className="header__account-icon"/>
                </Link>
              </li>
            </ul>
          </nav>
          <MobileMenu mobileMenuShown={mobileMenuShown}
                      handleBurgerClick={handleBurgerClick}
          />
        </div>
        :
        <nav className='header__nav_logout'>
            <Link to='/signup' className='header__link'>Регистрация</Link>
            <Link to='/signin' className='header__button'>Войти</Link>
        </nav>
      }
    </header>
  );
}
    
export default Header;