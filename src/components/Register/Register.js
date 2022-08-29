import React, { useState } from 'react';
import SignupHeader from '../SignupHeader/SignupHeader';
import { Link } from 'react-router-dom';

function Register({handleRegister}) {
  const [formParams, setFormParams] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let { name, email, password} = formParams;
    handleRegister({ name, email, password })
      .then(() => {
        setSignupSuccess(true);
      })
      .catch(err => {
        setSignupSuccess(false);
        setMessage(JSON.stringify(err.message));
      })
  }

  return (
    <div className="register">
      <SignupHeader text="Добро пожаловать!"/>
      <main>
        <form
          onSubmit={handleSubmit}
          className="register__form">
            <label htmlFor="name" className="register__form-label">Имя</label>
              <input id="name" 
                     name="name" 
                     type="text" 
                     value={formParams.name} 
                     onChange={handleChange}  
                     className="register__form-input"
                     placeholder="Ваше имя"    
                     required
                    />
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
                    Зарегистрироваться
            </button>
          </form>
          <div className="register__signin">
            <p className="register__signin-text">Уже зарегистрированы?</p>
            <Link to="/signin" className="register__signin-link">Войти</Link>
          </div>
      </main>
    </div>
  );
}

export default Register;