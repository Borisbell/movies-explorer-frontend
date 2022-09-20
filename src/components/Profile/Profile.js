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
  const [currentUser, setCurrentUser] = useState(userData);
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const [canSubmit, setCanSubmit] = useState(false);
  // const {userData, setUserData} = useContext(CurrentUserContext);

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
  }

  useEffect(() => {
    inputName.current.value = currentUser.name;
    inputEmail.current.value = currentUser.email;
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [])

  useEffect(() => {
    if(values.name !== currentUser.name || values.email !== currentUser.email){
      setCanSubmit(true)
    } else {  setCanSubmit(false) }
  }, [values])

  return (
    <>
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
                      pattern="^[A-Za-z0-9]{3,16}$"
                      required
                      onChange={onChange}
                      ref={inputName}
                      />   
                <p className='profile__form-error'>
                Username should be 3-16 characters and shouldn't include any special character!
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
                      required 
                      onChange={onChange}
                      ref={inputEmail}
                    />
                <p className='profile__form-error'>
                It should be a valid email address!
                </p> 
              </div>
            </fieldset>
            <div className="profile__buttons">
              {message && <p className='profile__form-error'>{message}</p>}      
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
    </>
  );
}
    
export default Profile;