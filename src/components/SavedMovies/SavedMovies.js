import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function SavedMovies(props) {
  return (
    <div className='saved-movies'>
      <Header loggedIn={true}/>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  );
}
    
export default SavedMovies;