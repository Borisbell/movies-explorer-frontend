import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'
import img1 from '../../images/cards/pic__COLOR_pic-1.jpg';
import img2 from '../../images/cards/pic__COLOR_pic-2.jpg';
import img3 from '../../images/cards/pic__COLOR_pic.jpg';

function MoviesCardList(props) {
  return (
    <div className='movies-card-list'>
      <MoviesCard img={img1}/>
      <MoviesCard img={img2}/>
      <MoviesCard img={img3}/>
    </div>
  );
}
    
export default MoviesCardList;