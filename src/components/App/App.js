import { Routes, Route, useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as api from '../../utils/MainApi';
import { getBeatFilmMovies } from '../../utils/MoviesApi';
import { addMovie, getMyMovies, deleteMovie } from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [moviesDB, setMoviesDB] = useState([]);
  const [moviesFromMyServer, setMoviesFromMyServer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  
  const handleLogin = (email, password) => {
    return api.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck();
          navigate('/movies');
        }
      })
  }

  const handleRegister = (name, email, password) => {
    return api.register(name, email, password)
    .then(() => {
      handleLogin({ email, password });
      navigate('/movies'); //лишнее?
    });
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')){
      let jwt = localStorage.getItem('jwt');
      api.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserData((prev) => res);
          localStorage.setItem('userData', JSON.stringify(res));
          return res;
        })
        .catch(err => {
          console.log('Ошибка: ', err)
        })
      } else {
        console.log('jwt not found in localstorage')
      }
    }

  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('moviesSearchque');
    localStorage.removeItem('moviesSearchIsShort');
    localStorage.removeItem('moviesSearchCards');
    setLoggedIn(false);
    setUserData(null);
    setMoviesDB([]);
    setMoviesFromMyServer([]);
    navigate('/');
    }

  const token = localStorage.getItem('jwt');

  const handleSavedMovie = (card, token) => {
    card.isSaved = true;
    const { created_at, id, updated_at, ...newCard } = card;
    newCard.owner = userData._id;
    console.log('Edited card ', newCard);

    const updatedMovieDB = moviesDB.map(movie => {
      if(movie.movieId === card.movieId){
        return {...movie, isSaved:true };
      }
      return movie;
    })

    addMovie(newCard, token)
      .then(newMovie => {
        newMovie.isSaved = true;
        setMoviesFromMyServer((prev) => [...moviesFromMyServer, newMovie]);
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })

    setMoviesDB((prev) => updatedMovieDB);
    console.log('moviesDB after saving movie ', updatedMovieDB);
  }  

  const handleDeleteMovie = (card, token) => {
    console.log('Clicked delete', card);

    setMoviesDB(current => current.map(obj => {
      if (obj.id === card.movieId) {
        return {...obj, isSaved: false};
      }
      return obj;
      }
      )
    );

    deleteMovie(card._id, token)
      .then(deletedMovie => {
        setMoviesFromMyServer(moviesFromMyServer.filter(
          (movie) => movie._id !== deletedMovie._id
        ))
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
  }

  const handleDeleteFromMovies = (card, token) => {
    card.isSaved = false;
    setMoviesDB(current => current.map(obj => {
      if (obj.id === card.movieId) {
        return {...obj, isSaved: false};
      }
        return obj;
      })
    );

    const cardId = moviesFromMyServer.find(movie => movie.movieId === card.id);

    deleteMovie(cardId._id, token)
      .then(deletedMovie => {
        setMoviesFromMyServer(moviesFromMyServer.filter(
          (movie) => movie._id !== deletedMovie._id
        ))
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
  }

  function filterMyMovies(value) {
    return value.owner === userData._id
  }
  
  useEffect(() => {
    tokenCheck();
  },[]);

  useEffect(() => {
    Promise.all([getMyMovies(token), 
                 getBeatFilmMovies(),
                ])
      .then(([myMovies, 
              beatMovies,
            ]) => {     
        const myFilteredMovies = myMovies.filter(filterMyMovies);
        const updatedArray = beatMovies.map(
          (movie) => ({
            ...movie,
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`, 
            image:`https://api.nomoreparties.co/.${movie.image.url}`,
            movieId: movie.id, 
            isSaved: myFilteredMovies.some(item => item.movieId === movie.id)
          })
        )
        return [myFilteredMovies, updatedArray]
      })
      .then(([myFilteredMovies, 
        updatedArray, 
      ]) => {
        setMoviesFromMyServer((prev) => myFilteredMovies);
        setMoviesDB((prev) => updatedArray);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      });
  },[loggedIn]);

  if(isLoading){
    return ( <Preloader />)
  }

  return (
    <CurrentUserContext.Provider value={{userData, setUserData}}>
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn}/>} />
        <Route element={<ProtectedRoute loggedIn={!loggedIn} />}>
          <Route path="signin" element={
            <Login
              handleLogin={handleLogin} 
            />} />
          <Route path="signup" 
                element={<Register 
                handleRegister={handleRegister}
                handleLogin={handleLogin}  
                />} 
            />
        </Route>
        <Route element={<ProtectedRoute loggedIn={localStorage.getItem('jwt')} />}>
            <Route path="saved-movies" element={ 
              <SavedMovies 
                userData={userData}
                loggedIn={loggedIn} 
                setMoviesFromMyServer={setMoviesFromMyServer}
                moviesFromMyServer={moviesFromMyServer}
                handleDeleteMovie={handleDeleteMovie}
                token={token}
              />
              }   
            />
            <Route path="movies" element={ 
              <Movies 
                moviesDB={moviesDB}
                handleSavedMovie={handleSavedMovie}  
                handleDeleteMovie={handleDeleteFromMovies}
                loggedIn={loggedIn}   
              />
              }   
            />
            <Route path="profile" element={ 
              <Profile loggedIn={loggedIn} 
                        signOut={signOut}
                        userData={userData}
                        setUserData={setUserData}
                        />
              }   
            />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
