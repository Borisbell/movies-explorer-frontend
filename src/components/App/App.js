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
import { addMovie, getMyMovies } from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [moviesDB, setMoviesDB] = useState([]);
  const [moviesFromMyServer, setMoviesFromMyServer] = useState([]);
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
      handleLogin({ email, password })
    });
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')){
      let jwt = localStorage.getItem('jwt');
      api.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
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

    console.log('Clicked save: ', card);
    console.log('Saving user token: ', token);

    const { created_at, id, updated_at, ...newCard } = card;
    newCard.owner = userData._id;
    console.log('Edited card ', newCard)

    addMovie(newCard, token)
      .then(newMovie => {
        newMovie.isSaved = true;
        setMoviesFromMyServer([newMovie, ...moviesFromMyServer]);
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
  }  

  function filterMyMovies(value) {
    return value.owner === userData._id
  }

  useEffect(() => {
    Promise.all([tokenCheck(), getMyMovies(token), getBeatFilmMovies()])
    .then(([userData, myMovies, beatMovies]) => {
      console.log('myMovies', myMovies);
      console.log('beatMovies', beatMovies);
      console.log('userData ', userData);

      setMoviesFromMyServer(myMovies.filter(filterMyMovies));
      console.log('moviesFromMyServer: ', moviesFromMyServer);

      const updatedArray = beatMovies.map(
        (movie) => ({
          ...movie,
          thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`, 
          image:`https://api.nomoreparties.co/.${movie.image.url}`,
          movieId: movie.id, 
          isSaved: moviesFromMyServer.some(item => item.movieId === movie.id)
        })
      )
      console.log('updatedArray: ', updatedArray);
      setMoviesDB(updatedArray);
    })
    .finally(() => {

      })
    .catch(err => {
      console.log('Ошибка: ', err)
    });
  },[]);


  return (
    <CurrentUserContext.Provider value={userData}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="signin" element={
          <Login
            handleLogin={handleLogin} 
            tokenCheck={tokenCheck} 
            loggedIn={loggedIn}
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
                                        handleSavedMovie={handleSavedMovie}    
                                        />} />
        <Route path="saved-movies" element={<SavedMovies 
                                              userData={userData}
                                              />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
