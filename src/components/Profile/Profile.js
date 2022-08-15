import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Profile({name}) {
  return (
    <>
      <div className="profile">
        <Header loggedIn={true}/>
        <h1 className="profile__header">Привет, {name}!</h1>
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
          <div className="profile__buttons">
            <button type="submit" 
                    className="profile__edit">
                    Редактировать
            </button>
            <Link to="/signin" className="profile__logout">Выйти из аккаунта</Link>
          </div>
        </form>
      </div>
    </>
  );
}
    
export default Profile;