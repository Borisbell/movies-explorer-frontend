import React, {useEffect, useState} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import { getMyMovies} from '../../utils/MainApi';

function SavedMovies({userData, handleDeleteMovie}) {
  const [moviesFromServer, setMoviesFromServer] = useState([]);
  const token = localStorage.getItem('jwt');

  function filterMyMovies(value) {
    return value.owner === userData._id
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
  },[])  

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