import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Profile(props) {
  return (
    <>
      <div className="profile">
        <Header loggedIn={true}/>
        <h1 className="profile__header">Привет, {props.name}!</h1>
        <form
          // onSubmit={} 
          className="profile__form">
          <fieldset className="profile__fieldset">
            <label htmlFor="email" className="profile__form-label">E-mail</label>
            <input id="email" 
                  name="email" 
                  type="email" 
                  //  value={} 
                  //  onChange={} 
                  className="profile__form-input"
                  placeholder="Email"    
                  required
                  />
          </fieldset>
          <fieldset className="profile__fieldset">
            <label htmlFor="email" className="profile__form-label">Пароль</label>       
            <input id="email"  
                name="email" 
                type="email" 
                // value={} 
                // onChange={}
                className="profile__form-input"
                placeholder="pochta@yandex.ru" 
                required/>
          </fieldset>
          <button type="submit" 
                  className="profile__edit">
                  Редактировать
          </button>
        </form>
          <Link to="/signup" className="register__signin-text register__signin-link">Выйти из аккаунта</Link>
      </div>
    </>
  );
}
    
export default Profile;