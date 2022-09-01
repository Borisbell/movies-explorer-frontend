import React, {useEffect, useState} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import { getMyMovies} from '../../utils/MainApi';

function SavedMovies() {
  const [moviesFromServer, setMoviesFromServer] = useState([]);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    getMyMovies(token)
    .then((movies) => {
      console.log(movies);
      setMoviesFromServer(movies);
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
                        placeMovies={false}/>
        : ''}
      </main>
      <Footer />
    </div>
  );
}
    
export default SavedMovies;