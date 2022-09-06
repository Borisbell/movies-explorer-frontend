import React, {useState } from "react";
import Header from '../Header/Header';
import * as api from '../../utils/MainApi';

function Profile({signOut, userData, loggedIn}) {
  const token = localStorage.getItem('jwt');
  const [currentUser, setCurrentUser] = React.useState({name: userData.name, email: userData.email});
  const [formParams, setFormParams] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleUpdateUser = (email, name,) => {
    api.editProfile(email, name, token)
      .then(res => {
        console.log('editProfile res - ',res.data);
        setCurrentUser(res.data);
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({formParams})
  }

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
              <label htmlFor="name" className="profile__form-label">Имя</label>
              <input id="name" 
                    name="name" 
                    type="name" 
                    value={formParams.name} 
                    onChange={handleChange} 
                    className="profile__form-input"
                    placeholder={currentUser.name}   
                    required
                    />
            </fieldset>
            <fieldset className="profile__fieldset">
              <label htmlFor="email" className="profile__form-label">Email</label>       
              <input id="email"  
                  name="email" 
                  type="email" 
                  value={formParams.email} 
                  onChange={handleChange} 
                  className="profile__form-input"
                  placeholder={currentUser.email}
                  required/>
            </fieldset>
            <div className="profile__buttons">
              <button type="submit" 
                      className="profile__edit">
                      Редактировать
              </button>
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