import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({loggedIn, handleDeleteMovie, moviesFromMyServer}) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQue, setSearchQue] = useState('');
  const [isShort, setIsShort] = useState(false);

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
    let searchResult = moviesFromMyServer.filter(filterMovies);
    if(isShort){
      searchResult = searchResult.filter(shortMovies);
    }
    setIsLoading(false);
    setCards(cards => searchResult);
    window.localStorage.setItem('moviesSearchque', JSON.stringify(searchQue));
    window.localStorage.setItem('moviesSearchIsShort', JSON.stringify(isShort));
  }

  const handleShortMoviesChange = () => {
    setIsShort(!isShort);
  };

  useEffect(() => {
    setCards(moviesFromMyServer);
  }, [])

  return (
    <div className='saved-movies'>
      <Header loggedIn={loggedIn}/>
      <main>
        <SearchForm handleSearch={handleSearch}
                    handleSearchData={handleSearchData}
                    isShort={isShort} 
                    handleShortMoviesChange={handleShortMoviesChange}/>
        {cards ?
          <MoviesCardList cards={cards}
                          placeMovies={false}
                          handleDeleteMovie={handleDeleteMovie}  
          />
        : <p className='movies__not-found'>Ничего не найдено 😕</p>}
      </main>
      <Footer />
    </div>
  );
}
    
export default SavedMovies;