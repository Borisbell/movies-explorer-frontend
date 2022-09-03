import { Routes, Route, useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as api from '../../utils/MainApi';
import { getBeatFilmMovies } from '../../utils/MoviesApi';
import { addMovie, deleteMovie, getMyMovies} from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [moviesDB, setMoviesDB] = useState([]);
  const [savedMoviesDB, setSavedMoviesDB] = useState([]);
  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    return api.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck();
        }
      })
  }

  const handleRegister = ({name, email, password }) => {
    return api.register(name, email, password)
    .then(() => {
      setTimeout(() => {navigate('/signin')}, 3000)
    });
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')){
      let jwt = localStorage.getItem('jwt');
      api.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          console.log('userData: ', res);
          setUserData(res);
        })
        .then(() => {
          navigate('/movies');
        });
      };
    }

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData(null);
    navigate('/signin');
    }
  
  const token = localStorage.getItem('jwt');

  const handleSavedMovie = (card, token) => {

    console.log('Clicked save', card);

    const { created_at, id, updated_at, ...newCard } = card;
    newCard.owner = userData._id;
    console.log('Edited card ', newCard)

    addMovie(newCard, token)
    .then(newMovie => {
      newMovie.isSaved = true;
      setSavedMoviesDB([newMovie, ...savedMoviesDB]);
    })
    .catch(err => {
      console.log('Ошибка: ', err)
    })
  }  

  const handleDeleteMovie = (card, token) => {
    console.log('Clicked delete', card);

    deleteMovie(card._id, token)
      .then(deletedMovie => {
        console.log(deletedMovie)
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
  }

  useEffect(() => {
    getBeatFilmMovies()
      .then((data) => {
        setMoviesDB(data);
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
    },[]);

  useEffect(() => {
    getMyMovies(token)
    .then((movies) => {
      setSavedMoviesDB(movies);
    })
    .catch(err => {
      console.log('Ошибка: ', err)
    })
  },[])   

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={userData}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="signin" element={
          <Login
            handleLogin={handleLogin} 
            tokenCheck={tokenCheck} 
            loggedIn={loggedIn}
            setMoviesDB={setMoviesDB}
          />} />
        <Route path="signup" element={<Register 
          handleRegister={handleRegister}/>} 
          />
        <Route path="profile" element={
          <Profile loggedIn={loggedIn} 
                   signOut={signOut}
                   userData={userData}/>
        } />
        <Route path="movies" element={<Movies 
                                        moviesDB={moviesDB}
                                        savedMoviesDB={savedMoviesDB}
                                        handleSavedMovie={handleSavedMovie}    
                                        />} />
        <Route path="saved-movies" element={<SavedMovies 
                                              userData={userData}
                                              savedMoviesDB={savedMoviesDB}
                                              setSavedMoviesDB={setSavedMoviesDB} 
                                              handleDeleteMovie={handleDeleteMovie} 
                                              />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
