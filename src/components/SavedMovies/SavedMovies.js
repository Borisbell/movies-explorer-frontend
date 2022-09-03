import React, {useEffect, useState} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import { getMyMovies, deleteMovie } from '../../utils/MainApi';

function SavedMovies({userData}) {
  const [moviesFromServer, setMoviesFromServer] = useState([]);
  const token = localStorage.getItem('jwt');

  function filterMyMovies(value) {
    return value.owner === userData._id
  }

  const handleDeleteMovie = (card, token) => {
    console.log('Clicked delete', card);

    deleteMovie(card._id, token)
      .then(deletedMovie => {
        console.log('deletedMovie', deletedMovie)
        console.log(moviesFromServer)
        setMoviesFromServer(moviesFromServer.filter(
          (movie) => movie._id !== deletedMovie._id
        ))
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
  }

  useEffect(() => {
    getMyMovies(token)
    .then((movies) => {
      const mySavedMovies = movies.filter(filterMyMovies);
      console.log('userData: ', userData);
      console.log('mySavedMovies: ', mySavedMovies);
      setMoviesFromServer(mySavedMovies);
    })
    .catch(err => {
      console.log('Ошибка: ', err)
    })
  },[]);

  return (
    <div className='saved-movies'>
      <Header loggedIn={true}/>
      <main>
        <SearchForm />
        {moviesFromServer ?
          <MoviesCardList cards={moviesFromServer}
                          placeMovies={false}
                          handleDeleteMovie={handleDeleteMovie}  
          />
        : ''}
      </main>
      <Footer />
    </div>
  );
}
    
export default SavedMovies;