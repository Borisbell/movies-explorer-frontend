import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies({moviesDB, handleSavedMovie, handleDeleteMovie, loggedIn}) {
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
    setCards(cards => searchResult);
    window.localStorage.setItem('moviesSearchque', JSON.stringify(searchQue));
    window.localStorage.setItem('moviesSearchIsShort', JSON.stringify(isShort));
  }

  const handleShortMoviesChange = () => {
    setIsShort(!isShort);
  };

  useEffect(() => {
    if(cards.length){
    window.localStorage.setItem('moviesSearchCards', JSON.stringify(cards));
    }
  },[moviesDB, cards, handleSavedMovie, handleDeleteMovie])

  useEffect(() => {
    const moviesSearchque = window.localStorage.getItem('moviesSearchque');
    if(moviesSearchque !== null){ setSearchQue(JSON.parse(moviesSearchque))};

    const moviesSearchIsShort = window.localStorage.getItem('moviesSearchIsShort');
    if(moviesSearchIsShort !== null){ setIsShort(JSON.parse(moviesSearchIsShort))};

    const moviesSearchCards = window.localStorage.getItem('moviesSearchCards');
    if(moviesSearchCards !== null){ setCards(cards => JSON.parse(moviesSearchCards))}
  },[])

  useEffect(() => {
    const moviesSearchCards = JSON.parse(localStorage.getItem('moviesSearchCards'));
    console.log('moviesSearchCards after parse: ', moviesSearchCards)
    if (moviesSearchCards !== null) {const updatedSavedMoviesArray = moviesSearchCards.map(obj => {
      const tempObj = moviesDB.find(item => item.movieId === obj.movieId)
      if (obj.isSaved === true && tempObj.isSaved === false){
        return {...obj, isSaved: false};
      }
      return obj;
    });

    setCards(prev => updatedSavedMoviesArray);}

  },[moviesDB])


  return (
    <div className="movies">
      <Header loggedIn={loggedIn}/>
      <main>
        <SearchForm handleSearch={handleSearch}
                    handleSearchData={handleSearchData}
                    isShort={isShort} 
                    handleShortMoviesChange={handleShortMoviesChange} 
                    searchQue={searchQue}
                    />
        {isLoading ? 
          <Preloader />
          : cards.length > 0 ?
          <MoviesCardList placeMovies={true} 
                          cards={cards}
                          handleSavedMovie={handleSavedMovie}  
                          handleDeleteMovie={handleDeleteMovie}
          />
          : <p className='movies__not-found'>Ничего не найдено 😕</p>
        }
      </main>
      <Footer />
    </div>
  );
}
    
export default Movies;