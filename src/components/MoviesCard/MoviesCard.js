import React from 'react';
import SaveButton from '../SaveButton/SaveButton';
import DeleteButton from '../DeleteButton/DeleteButton';

function MoviesCard({card,
                     img, 
                     imgAlt,
                     nameRU,
                     duration,
                     isSaved,
                     placeMovies,
                     handleSavedMovie,
                     handleDeleteMovie}) {

  const token = localStorage.getItem('jwt');

  function handleSave() {
    handleSavedMovie(card, token);
  }        
  
  function handleDelete() {
    handleDeleteMovie(card, token);
  } 

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
      placeMovies ? <SaveButton 
                      isSaved={isSaved}
                      handleSave={handleSave}  
                      />
                  : <DeleteButton handleDelete = {handleDelete}/>
      }
    </div>
  );
}
    
export default MoviesCard;