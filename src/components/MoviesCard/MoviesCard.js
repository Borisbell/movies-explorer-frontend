import React, { useState } from 'react';

function MoviesCard(props) {
  return (
    <div className="movies-card">
      <img src={props.img} className="movies-card__img"/>
      <div className="movies-card__description">
        <p className="movies-card__title">Киноальманах «100 лет дизайна»</p>
        <p className="movies-card__duration">1ч 17м</p>
      </div>
      <button className="movies-card__save">Сохранить</button>
    </div>
  );
}
    
export default MoviesCard;