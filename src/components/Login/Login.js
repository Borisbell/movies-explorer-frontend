import React, { useState } from 'react';
import SignupHeader from '../SignupHeader/SignupHeader';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Login({handleLogin}) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: "onChange"
  })

  const [message, setMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(true);

  const onSubmit = ({ email, password}) => {
    handleLogin(email, password)
      .then(() => { 
        setSignupSuccess(true);
      })
      .catch(err => {
        setSignupSuccess(false);
        setMessage(JSON.stringify(err.message));
      })
  }

  return (
    <>
      <div className="register">
        <SignupHeader text="Рады видеть!"/>
        <main>
          <form
           onSubmit={handleSubmit(onSubmit)}
            className="register__form">
            <label htmlFor="email" className="register__form-label">E-mail</label>
            <input id="email" 
                  name="email" 
                  type="email"
                  className="register__form-input"
                  placeholder="Email"
                  {...register("email", {
                    required: "Обязательное поле",
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'Email должен содержать символ @'
                      }
                    }
                  )}       
                  required
                  />
            <p className='register__form-error'>
              {errors?.email && errors?.email.message}
            </p>  
            <label htmlFor="password" className="register__form-label">Пароль</label>       
            <input id="password"  
                name="password" 
                type="password"
                className="register__form-input"
                placeholder="Пароль"
                {...register("password", {
                    required: "Обязательное поле",
                    minLength: {
                      value: 4,
                      message: 'Минимум 4 символа'
                    }
                  })
                } 
                required/>
                <p className='register__form-error'>
                  {errors?.password && errors?.password.message}
                </p> 
                <input type="submit" 
                   className="register__form-submit"
                   value="Войти"
                   disabled={!isValid}
                    />
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