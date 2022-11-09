import React from 'react';
import SaveButton from '../SaveButton/SaveButton';
import DeleteButton from '../DeleteButton/DeleteButton';

function MoviesCard({card,
                     img, 
                     imgAlt,
                     nameRU,
                     trailerLink,
                     duration,
                     isSaved,
                     placeMovies,
                     handleSavedMovie,
                     handleDeleteMovie}) {

  const token = localStorage.getItem('jwt');

  function toHoursAndMinutes(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
  
    return `${hours}ч ${minutes}м`;
  }

  const durationInHours = toHoursAndMinutes(duration)

  function handleSave() {
    handleSavedMovie(card, token);
  }        
  
  function handleDelete() {
    handleDeleteMovie(card, token);
  } 

  return (
    <div className="movies-card">
      <a href={trailerLink}
         target="_blank"
         rel="noreferrer noopener">
      <img src={img} 
           alt={imgAlt} 
           className="movies-card__img"/>
      </a>
      <div className="movies-card__description">
        <p className="movies-card__title">{nameRU} </p>
        <p className="movies-card__duration">{durationInHours}</p>
      </div>
      {
      placeMovies ? <SaveButton 
                      isSaved={isSaved}
                      handleSave={handleSave}  
                      handleDelete = {handleDelete}
                      />
                  : <DeleteButton handleDelete = {handleDelete}/>
      }
    </div>
  );
}
    
export default MoviesCard;