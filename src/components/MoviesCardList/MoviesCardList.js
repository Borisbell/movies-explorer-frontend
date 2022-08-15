import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import img1 from '../../images/cards/pic__COLOR_pic-1.jpg';
import img2 from '../../images/cards/pic__COLOR_pic-2.jpg';
import img3 from '../../images/cards/pic__COLOR_pic.jpg';

function MoviesCardList(props) {
  return (
    <div className='movies-card-list'>
      <MoviesCard img={img1} isSaved={false}/>
      <MoviesCard img={img2} isSaved={false}/>
      <MoviesCard img={img3} isSaved={true}/>
      <button className='movies-card-list__load-more'>Ещё</button>
    </div>
  );
}
    
export default MoviesCardList;