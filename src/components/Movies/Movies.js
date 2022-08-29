import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

// import {getMovies} from '../../utils/MoviesApi';

function Movies({moviesDB}) {
  const [cards, setCards] = useState(moviesDB);
  const [searchQue, setSearchQue] = useState('');

  function handleSearch(event) {
    console.log(event.target.value);
    setSearchQue(event.target.value);
  }

  function filterMovies(value) {
    return value.nameRU.toLowerCase().includes(searchQue.toLowerCase())
  }

  function handleSearchData(event) {
    event.preventDefault();
    console.log('filtered movies', cards.filter(filterMovies))
    setCards(cards.filter(filterMovies));
  }

  return (
    <div className="movies">
      <Header loggedIn={true}/>
      <main>
        <SearchForm handleSearch={handleSearch}
                    handleSearchData={handleSearchData}/>
        <MoviesCardList placeMovies={true} cards={cards}/>
      </main>
      <Footer />
    </div>
  );
}
    
export default Movies;