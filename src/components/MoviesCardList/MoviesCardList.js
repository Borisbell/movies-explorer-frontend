import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({placeMovies, 
                         cards,
                         handleSavedMovie,
                         handleDeleteMovie}) {
  const [cardsLeft, setCardsLeft] = useState(1);
  const [sliceEnd, setSliceEnd] = useState(12);
  const [counter, setCounter] = useState(0);

  const handleLoadMoreMovies = () => {
    setSliceEnd(sliceEnd + counter);
    setCardsLeft(cardsLeft - counter);
  }

  useEffect(()=>{
    setCardsLeft(cards.length - sliceEnd);

    if(window.innerWidth >= 920){
      setCounter(3);
      setSliceEnd(12);
    } else if (window.innerWidth <= 920 && window.innerWidth > 600){
      setCounter(2);
      setSliceEnd(8);
    } else {
      setCounter(1);
      setSliceEnd(5);
    }

  }, [cards.length, sliceEnd])

  return (
    <div className='movies-card-list'>
      {cards.slice(0, sliceEnd).map((card) => (
        <MoviesCard key={card.movieId}
                    card={card}
                    img={card.image}
                    nameRU={card.nameRU}
                    imgAlt={card.image.alternativeText} 
                    duration={card.duration}
                    isSaved={card.isSaved} 
                    placeMovies={placeMovies} 
                    handleSavedMovie={handleSavedMovie}
                    handleDeleteMovie={handleDeleteMovie}
                    />
          ))}
      {cardsLeft>0 && <button className='movies-card-list__load-more' onClick={handleLoadMoreMovies}>Ещё</button>}
    </div>
  );
}
    
export default MoviesCardList;