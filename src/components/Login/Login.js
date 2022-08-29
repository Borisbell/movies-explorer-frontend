import React, { useState } from 'react';
import SignupHeader from '../SignupHeader/SignupHeader';
import { Link } from 'react-router-dom';

function Login({handleLogin}) {
  const [formParams, setFormParams] = useState({
    email: '',
    password: '',
  });
  const [signupSuccess, setSignupSuccess] = useState(true);
  // const [isToolTipOpen, setIsToolTipOpen] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password} = formParams;
    handleLogin({ email, password })
    .catch(err => {
      setSignupSuccess(false);
      // setIsToolTipOpen(true);
    })
  }

  // const handleCloseToolTip = () => {
  //   setIsToolTipOpen(false)
  // }

  return (
    <>
      <div className="register">
        <SignupHeader text="Рады видеть!"/>
        <main>
          <form
            onSubmit={handleSubmit}
            className="register__form">
            <label htmlFor="email" className="register__form-label">E-mail</label>
            <input id="email" 
                  name="email" 
                  type="email" 
                  value={formParams.email} 
                  onChange={handleChange} 
                  className="register__form-input"
                  placeholder="Email"    
                  required
                  />
            <label htmlFor="password" className="register__form-label">Пароль</label>       
            <input id="password"  
                name="password" 
                type="password" 
                value={formParams.password} 
                  onChange={handleChange} 
                className="register__form-input"
                placeholder="Пароль" 
                required/>
            <button type="submit" 
                    className="register__form-submit">
                    Войти
            </button>
          </form>
          <div className="register__signin">
            <p className="register__signin-text">Ещё не зарегистрированы?</p>
            <Link to="/signup" className="register__signin-text register__signin-link">Регистрация</Link>
          </div>
        </main>
      </div>
    </>
  );
}
    
export default Login;