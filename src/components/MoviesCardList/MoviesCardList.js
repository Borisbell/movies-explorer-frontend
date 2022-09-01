import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({placeMovies, 
                         cards,
                         handleSavedMovie}) {
  return (
    <div className='movies-card-list'>
      {cards.map((card) => (
        <MoviesCard key={card.id}
                    card={card}
                    img={`https://api.nomoreparties.co/.${card.image.url}`}
                    nameRU={card.nameRU}
                    imgAlt={card.image.alternativeText} 
                    duration={card.duration}
                    isSaved={false} 
                    placeMovies={placeMovies} 
                    handleSavedMovie={handleSavedMovie}
                    />
          ))}
      <button className='movies-card-list__load-more'>Ещё</button>
    </div>
  );
}
    
export default MoviesCardList;