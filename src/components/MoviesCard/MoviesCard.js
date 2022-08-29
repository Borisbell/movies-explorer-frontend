import React from 'react';
import SaveButton from '../SaveButton/SaveButton';

function MoviesCard({img, imgAlt, nameRU, duration, isSaved, placeMovies}) {
  return (
    <div className="movies-card">
      <img src={img} 
           alt={imgAlt} 
           className="movies-card__img"/>
      <div className="movies-card__description">
        <p className="movies-card__title">{nameRU} </p>
        <p className="movies-card__duration">{duration}</p>
      </div>
      {
      placeMovies && <SaveButton isSaved={isSaved}/>
      }
    </div>
  );
}
    
export default MoviesCard;