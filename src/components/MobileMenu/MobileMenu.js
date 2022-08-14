import React, { useState } from 'react';
import icon from '../../images/header/account-icon.svg';
import close from '../../images/header/close.svg';
import { Link } from 'react-router-dom';

function MobileMenu({mobileMenuShown, handleBurgerClick}) {

  return (
    <div className={mobileMenuShown ? "mobile-menu__bg-active" : "mobile-menu__bg"}>
      <div className="mobile-menu">
        <nav className="mobile-menu__nav">
          <img src={close} 
               className="mobile-menu__close" 
               alt="закрыть меню"
               onClick={handleBurgerClick}
               />
          <ul className='mobile-menu__list'>
            <li className='mobile-menu__item'>
              <Link to='/' className='mobile-menu__link'>Главная</Link>
            </li>
            <li className='mobile-menu__item'>
              <Link to='/movies' className='mobile-menu__link'>Фильмы</Link>
            </li>
            <li className='mobile-menu__item'>
              <Link to='/saved-movies' className='mobile-menu__link'>Сохраненные фильмы</Link>
            </li>
          </ul>
        </nav>
        <Link to='/profile' className='mobile-menu__profile'>
          <p>Аккаунт</p>
          <img src={icon} alt="иконка пользователя" className="mobile-menu__account-icon"/>
        </Link>
      </div>
    </div>
  );
}
    
export default MobileMenu;