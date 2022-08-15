import React, { useState } from 'react';
import logo from '../../images/header/logo.svg';
import icon from '../../images/header/account-icon.svg';
import burger from '../../images/header/burger.svg';
import { Link, NavLink } from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu';

function Header({loggedIn}) {
  const [mobileMenuShown, SetMobileMenuShown] = useState(false);
  
  let activeStyle = {
    paddingBottom: '4px',
    borderBottom: 'solid 2px white',
  };

  function handleBurgerClick() {
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
                <NavLink to='/' 
                         className='header__nav-link'
                         style={({ isActive }) =>
                          isActive ? activeStyle : undefined}
                          >Главная</NavLink>
              </li>
              <li className='header__nav-item'>
                <NavLink to='/movies' 
                         className='header__nav-link'
                         style={({ isActive }) =>
                          isActive ? activeStyle : undefined}
                          >Фильмы</NavLink>
              </li>
              <li className='header__nav-item'>
                <NavLink to='/saved-movies' 
                         className='header__nav-link'
                         style={({ isActive }) =>
                          isActive ? activeStyle : undefined}
                          >Сохраненные фильмы</NavLink>
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