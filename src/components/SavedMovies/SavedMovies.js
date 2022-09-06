import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({loggedIn, handleDeleteMovie, moviesFromMyServer}) {


  return (
    <div className='saved-movies'>
      <Header loggedIn={loggedIn}/>
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