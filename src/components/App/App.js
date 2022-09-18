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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as api from '../../utils/MainApi';
import { getBeatFilmMovies } from '../../utils/MoviesApi';
import { addMovie, getMyMovies, deleteMovie } from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [moviesDB, setMoviesDB] = useState([]);
  const [moviesFromMyServer, setMoviesFromMyServer] = useState([]);
  const navigate = useNavigate();

  
  const handleLogin = (email, password) => {
    return api.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck();
        }
      })
  }

  const handleRegister = (name, email, password) => {
    return api.register(name, email, password)
    .then(() => {
      handleLogin({ email, password });
      navigate('/movies');
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

    console.log('Clicked save: ', card);
    card.isSaved = true;
    const { created_at, id, updated_at, ...newCard } = card;
    newCard.owner = userData._id;
    console.log('Edited card ', newCard)

    const updatedMovieDB = moviesDB.map(movie => {
      if(movie.id === card.id){
        return {...movie, isSaved:true };
      }
      return movie;
    })

    setMoviesDB(updatedMovieDB);

    addMovie(newCard, token)
      .then(newMovie => {
        newMovie.isSaved = true;
        setMoviesFromMyServer(prev => [...moviesFromMyServer, newMovie]);
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
    
      console.log('moviesFromMyServer: ', moviesFromMyServer)
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

    console.log('moviesDB after delete is saved movies', moviesDB);

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
    console.log('Clicked delete', card);
    card.isSaved = false;
    setMoviesDB(current => current.map(obj => {
      if (obj.id === card.movieId) {
        return {...obj, isSaved: false};
      }
      return obj;
      }
      )
    );
    console.log('moviesDB after delete', moviesDB);

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
    Promise.all([getMyMovies(token), 
                 getBeatFilmMovies(), 
                 tokenCheck()
                ])
      .then(([myMovies, 
              beatMovies, 
              userData
            ]) => {
        const myFilteredMovies = myMovies.filter(filterMyMovies)
        setMoviesFromMyServer(myFilteredMovies);

        const updatedArray = beatMovies.map(
          (movie) => ({
            ...movie,
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`, 
            image:`https://api.nomoreparties.co/.${movie.image.url}`,
            movieId: movie.id, 
            isSaved: myFilteredMovies.some(item => item.movieId === movie.id)
          })
        )

        setMoviesDB(updatedArray);
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      });
  },[loggedIn]);

  return (
    <CurrentUserContext.Provider value={userData}>
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn}/>} />
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
        <Route path="profile" element={
          <ProtectedRoute loggedIn={loggedIn}>
             <Profile loggedIn={loggedIn} 
                   signOut={signOut}
                   userData={userData}/>
          </ProtectedRoute>
        }/>
          <Route path="movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies 
                moviesDB={moviesDB}
                handleSavedMovie={handleSavedMovie}  
                handleDeleteMovie={handleDeleteFromMovies}
                loggedIn={loggedIn}   
                />
             </ProtectedRoute>                                
          }/>
          <Route path="saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies 
                userData={userData}
                loggedIn={loggedIn} 
                setMoviesFromMyServer={setMoviesFromMyServer}
                moviesFromMyServer={moviesFromMyServer}
                handleDeleteMovie={handleDeleteMovie}
                token={token}
                />
            </ProtectedRoute>      
          }/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
