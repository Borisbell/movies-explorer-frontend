import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies({moviesDB, handleSavedMovie, loggedIn}) {
  const [cards, setCards] = useState([]);
  const [searchQue, setSearchQue] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    event.preventDefault();
    let searchResult = moviesDB.filter(filterMovies);
    if(isShort){
      searchResult = searchResult.filter(shortMovies);
    }
    setIsLoading(false);
    setCards(searchResult);
  }

  const handleShortMoviesChange = () => {
    setIsShort(!isShort);
  };

  return (
    <div className="movies">
      <Header loggedIn={loggedIn}/>
      <main>
        <SearchForm handleSearch={handleSearch}
                    handleSearchData={handleSearchData}
                    isShort={isShort} 
                    handleShortMoviesChange={handleShortMoviesChange} 
                    />
        {isLoading ? 
          <Preloader />
          :
          <MoviesCardList placeMovies={true} 
                          cards={cards}
                          handleSavedMovie={handleSavedMovie}  
          />
        }
      </main>
      <Footer />
    </div>
  );
}
    
export default Movies;