import SignupHeader from '../SignupHeader/SignupHeader';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="register">
      <SignupHeader text="Добро пожаловать!"/>
      <main>
        <form
          // onSubmit={}
          className="register__form">
            <label htmlFor="name" className="register__form-label">Имя</label>
              <input id="name" 
                    name="name" 
                    type="text" 
                    //  value={} 
                    //  onChange={} 
                    className="register__form-input"
                    placeholder="Ваше имя"    
                    required
                    />
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