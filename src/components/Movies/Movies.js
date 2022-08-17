import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies() {
  return (
    <div className="movies">
      <Header loggedIn={true}/>
      <main>
        <SearchForm />
        <MoviesCardList placeMovies={true}/>
      </main>
      <Footer />
    </div>
  );
}
    
export default Movies;