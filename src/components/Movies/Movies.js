import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies({moviesDB, savedMoviesDB, handleSavedMovie}) {
  const [cards, setCards] = useState([]);
  const [arrayForView, setArrayForView] = useState([])
  const [searchQue, setSearchQue] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [isSearchMade, setIsSearchMade] = useState(false);

  // function createArrayForView(moviesDB, savedMoviesDB){
  //   setArrayForView(moviesDB.forEach((movie) => savedMoviesDB.some( 
  //     savedMovie => savedMovie.id === movie.id)
  //     )) 
  // }

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

    console.log(cards);
    
    let searchResult = cards.filter(filterMovies);
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
      (movie) => ({...movie,
                      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`, 
                      image:`https://api.nomoreparties.co/.${movie.image.url}`,
                      movieId: movie.id 
                  }
                )
    )
    console.log('bffMovies: ', bffMovies);
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
        {isSearchMade ? 
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