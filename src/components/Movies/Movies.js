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
    window.localStorage.setItem('moviesSearchCards', JSON.stringify(cards));
  }

  const handleShortMoviesChange = () => {
    setIsShort(!isShort);
  };

  // useEffect(() => {
  //   window.localStorage.setItem('moviesSearchque', JSON.stringify(searchQue));
  //   console.log('moviesSearchque on search', searchQue)

  //   window.localStorage.setItem('moviesSearchIsShort', JSON.stringify(isShort));
  //   console.log('moviesSearchIsShort on search', isShort)

  //   window.localStorage.setItem('moviesSearchCards', JSON.stringify(cards));
  //   console.log('moviesSearchCards on search', cards)
  // },[searchQue, isShort, cards])

  useEffect(() => {
    const moviesSearchque = window.localStorage.getItem('moviesSearchque');
    if(moviesSearchque !== null){ setSearchQue(JSON.parse(moviesSearchque))};
    console.log('moviesSearchque on mount', moviesSearchque)

    const moviesSearchIsShort = window.localStorage.getItem('moviesSearchIsShort');
    if(moviesSearchIsShort !== null){ setIsShort(JSON.parse(moviesSearchIsShort))};
    console.log('moviesSearchIsShort on mount', moviesSearchIsShort)

    const moviesSearchCards = window.localStorage.getItem('moviesSearchCards');
    setCards(JSON.parse(moviesSearchCards));
  },[])

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
                          handleDeleteMovie={handleDeleteMovie}
          />
        }
      </main>
      <Footer />
    </div>
  );
}
    
export default Movies;