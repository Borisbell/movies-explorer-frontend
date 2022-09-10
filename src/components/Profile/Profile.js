import React, { useState, useEffect } from "react";
import Header from '../Header/Header';
import { useForm } from "react-hook-form";
import * as api from '../../utils/MainApi';

function Profile({signOut, loggedIn}) {
  const token = localStorage.getItem('jwt');
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState('');

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: "onChange"
  })

  const onSubmit = ({ name, email }) => {
    api.editProfile(email, name, token)
      .then(res => {
        console.log('editProfile res - ',res.data);
        setCurrentUser(res.data);
      })
      .catch(err => {
        console.log('Ошибка: ', err);
        setMessage(JSON.stringify(err.message));
      })
  }

  useEffect(() => {
    api.getContent(token)
      .then((res) => {
        console.log("UserData on mount ", res)
        setCurrentUser(res)
      })
  }, [])

  return (
    <>
      <div className="profile">
        <Header loggedIn={loggedIn}/>
        <main>
          <h1 className="profile__header">Привет, {currentUser.name}!</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="profile__form">
            <fieldset className="profile__fieldset">
              <label htmlFor="name" className="profile__form-label">
              Имя
              <p className='profile__form-error'>
              {errors?.name && errors?.name.message}
              </p> 
              </label>
              <input id="name" 
                    name="name" 
                    type="name"
                    className="profile__form-input"
                    placeholder={currentUser.name}
                    {...register("name", {
                    required: "Имя - обязательное поле",
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа в поле имя'
                    }  
                    })}
                    required
                    />
            </fieldset>
            
            <fieldset className="profile__fieldset">
              <label htmlFor="email" className="profile__form-label">
              Email
              <p className='profile__form-error'>
              {errors?.email && errors?.email.message}
              </p> 
              </label>       
              <input id="email"  
                  name="email" 
                  type="email"
                  className="profile__form-input"
                  placeholder={currentUser.email}
                  {...register("email", {
                    required: "Email - обязательное поле",
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'Email должен содержать символ @'
                    }
                    }
                  )}   
                  required/>
            </fieldset>
            <div className="profile__buttons">
              {message && <p className='profile__form-error'>{message}</p>}      
              <input type="submit" 
                    className="profile__edit"
                    value="Редактировать"
                    disabled={!isValid}
                      /> 
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