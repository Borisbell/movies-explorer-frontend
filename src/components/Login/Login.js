import SignupHeader from '../SignupHeader/SignupHeader';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <div className="register">
        <SignupHeader text="Рады видеть!"/>
        <form
          // onSubmit={} 
          className="register__form">
          <label htmlFor="email" className="register__form-label">E-mail</label>
          <input id="email" 
                 name="email" 
                 type="email" 
                //  value={} 
                //  onChange={} 
                 className="register__form-input"
                 placeholder="Email"    
                 required
                 />
          <label htmlFor="password" className="register__form-label">Пароль</label>       
          <input id="password"  
              name="password" 
              type="password" 
              // value={} 
              // onChange={}
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
      </div>
    </>
  );
}
    
export default Login;