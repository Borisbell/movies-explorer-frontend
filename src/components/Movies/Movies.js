import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies({moviesDB}) {
  const [cards, setCards] = useState([]);
  const [searchQue, setSearchQue] = useState('');
  const [isShort, setIsShort] = useState(false);

  function handleSearch(event) {
    console.log(event.target.value);
    setSearchQue(event.target.value);
  }

  function filterMovies(value) {
    return value.nameRU.toLowerCase().includes(searchQue.toLowerCase())
  }

  function shortMovies(value) {
    return value.duration <40
  }

  function handleSearchData(event) {
    event.preventDefault();
    console.log('filtered movies', moviesDB.filter(filterMovies))
    let searchResult = moviesDB.filter(filterMovies);
    if(isShort){
      console.log('short movies', searchResult.filter(shortMovies));
      searchResult = searchResult.filter(shortMovies);
    }
    setCards(searchResult);
  }

  const handleShortMoviesChange = () => {
    setIsShort(!isShort);
  };

  useEffect(() => {
    setCards(moviesDB);
  }, []);

  return (
    <div className="movies">
      <Header loggedIn={true}/>
      <main>
        <SearchForm handleSearch={handleSearch}
                    handleSearchData={handleSearchData}
                    isShort={isShort} 
                    handleShortMoviesChange={handleShortMoviesChange} 
                    />
        <MoviesCardList placeMovies={true} cards={cards}/>
      </main>
      <Footer />
    </div>
  );
}
    
export default Movies;