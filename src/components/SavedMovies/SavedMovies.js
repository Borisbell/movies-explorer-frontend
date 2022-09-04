import React, {useEffect, useState} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMyMovies, deleteMovie } from '../../utils/MainApi';

function SavedMovies({userData}) {
  const [moviesFromMyServer, setMoviesFromMyServer] = useState([]);
  const token = localStorage.getItem('jwt');

  const handleDeleteMovie = (card, token) => {
    console.log('Clicked delete', card);

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

  function filterMyMovies(value) {
    return value.owner === userData._id
  }

  useEffect(() => {
    getMyMovies(token)
      .then((myMovies) => {

        setMoviesFromMyServer(myMovies.filter(filterMyMovies));
        console.log('moviesFromMyServer: ', moviesFromMyServer);
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      });
    },[]);

  return (
    <div className='saved-movies'>
      <Header loggedIn={true}/>
      <main>
        <SearchForm />
        {moviesFromMyServer ?
          <MoviesCardList cards={moviesFromMyServer}
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