import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies({moviesDB, handleSavedMovie}) {
  const [cards, setCards] = useState([]);
  const [searchQue, setSearchQue] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [isSearchMade, setIsSearchMade] = useState(false);

  function handleSearch(event) {
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
    let searchResult = moviesDB.filter(filterMovies);
    if(isShort){
      searchResult = searchResult.filter(shortMovies);
    }
    setIsSearchMade(true);
    setCards(searchResult);
  }

  const handleShortMoviesChange = () => {
    setIsShort(!isShort);
  };

  useEffect(() => {
    const bffMovies = moviesDB.map(
      (movie) => ({...movie, image:`https://api.nomoreparties.co/.${movie.image.url}`})
    )
    setCards(bffMovies);
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
        {isSearchMade 
          ? 
          <MoviesCardList placeMovies={true} 
                          cards={cards}
                          handleSavedMovie={handleSavedMovie}  
          />
          : ''}
      </main>
      <Footer />
    </div>
  );
}
    
export default Movies;