import React from 'react';
import logo from '../../images/header/logo.svg';
import { Link } from 'react-router-dom';

function SignupHeader(props) {
  return (
    <header className="signup-header">
      <Link to='/'>
        <img src={logo} alt="Логотип" className="signup-header__logo"/> 
      </Link>
      <h1 className="signup-header__text">{props.text}</h1>
    </header>
  );
}
    
export default SignupHeader;