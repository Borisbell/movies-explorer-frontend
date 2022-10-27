import React, { useState, useEffect, useRef, useContext } from "react";
import Header from '../Header/Header';
import * as api from '../../utils/MainApi';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({signOut,
                  loggedIn, 
                  userData,
                  setUserData
                }) {
  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const token = localStorage.getItem('jwt');
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const [canSubmit, setCanSubmit] = useState(false);
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  // const {userData, setUserData} = useContext(CurrentUserContext);

  // console.log('userData: ', userData);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.editProfile( values.email, values.name, token)
      .then(res => {
        setCurrentUser(res.data);
        setUserData(res.data);
        setMessage(`Данные обновлены. Имя: ${res.data.name}, емейл: ${res.data.email}`);
      })
      .catch(err => {
        console.log('Ошибка: ', err);
        setMessage(JSON.stringify(err.message));
      })
    setIsTooltipShown(true);
    setTimeout(setIsTooltipShown(false), "5000");
  }

  useEffect(() => {
    setCurrentUser(userData)
    inputName.current.value = userData.name;
    inputEmail.current.value = userData.email;
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [userData])

  useEffect(() => {
    if(values.name !== currentUser.name || values.email !== currentUser.email){
      setCanSubmit((prev) => true)
    } else {  setCanSubmit((prev) => false) }
  }, [values.name, currentUser.name, values.email, currentUser.email])

  return (
    <div className="profile">
      <Header loggedIn={loggedIn}/>
      <main>
        <h1 className="profile__header">Привет, {currentUser.name}!</h1>
        <form
          onSubmit={handleSubmit}
          className="profile__form">
          <fieldset className="profile__fieldset">
            <label htmlFor="name" className="profile__form-label">
            Имя 
            </label>
            <div className="profile__form-input-group">
              <input id="name" 
                    name="name" 
                    type="name"
                    className="profile__form-input"
                    placeholder='Ваше Имя'
                    pattern="^[а-яА-ЯёЁa-zA-Z0-9]{3,16}$"
                    required
                    onChange={onChange}
                    ref={inputName}
                    />   
              <p className='profile__form-error'>
              Имя должно содержать 3-16 знаков, без спецсимволов.
              </p> 
            </div>      
          </fieldset>
          <fieldset className="profile__fieldset">
            <label htmlFor="email" className="profile__form-label">
            Email
            <p className='profile__form-error'>
            </p> 
            </label>
            <div className="profile__form-input-group">
              <input id="email"  
                    name="email" 
                    type="email"
                    className="profile__form-input"
                    placeholder='Ваш Email'
                    pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
                    required 
                    onChange={onChange}
                    ref={inputEmail}
                  />
              <p className='profile__form-error'>
              В почте должен быть @ и имя домена с точкой
              </p> 
            </div>
          </fieldset>
          <div className="profile__buttons">
            {isTooltipShown && <p className='profile__tooltip'>{message}</p>}      
            {canSubmit && <input type="submit" 
                                  className="profile__edit"
                                  value="Редактировать"
                          /> }
            <button className="profile__logout"
                    onClick={signOut}>
                    Выйти из аккаунта
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
    
export default Profile;