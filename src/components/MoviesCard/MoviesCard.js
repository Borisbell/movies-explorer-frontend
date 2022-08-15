import React from 'react';
import saved from '../../images/card/saved.svg';

function MoviesCard({img, imgAlt, isSaved}) {
  return (
    <div className="movies-card">
      <img src={img} 
           alt={imgAlt} 
           className="movies-card__img"/>
      <div className="movies-card__description">
        <p className="movies-card__title">Киноальманах «100 лет дизайна»</p>
        <p className="movies-card__duration">1ч 17м</p>
      </div>
      { isSaved ?
      <img src={saved} alt="фильм сохранён"
           className="movies-card__saved"/>
      :
      <button className="movies-card__save">Сохранить</button>
      }
    </div>
  );
}
    
export default MoviesCard;