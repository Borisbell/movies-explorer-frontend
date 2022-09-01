import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function SavedMovies({savedMoviesDB}) {
  console.log(savedMoviesDB);
  return (
    <div className='saved-movies'>
      <Header loggedIn={true}/>
      <main>
        <SearchForm />
        {savedMoviesDB ?
        <MoviesCardList cards={savedMoviesDB}
                        placeMovies={false}/>
        : ''}
      </main>
      <Footer />
    </div>
  );
}
    
export default SavedMovies;