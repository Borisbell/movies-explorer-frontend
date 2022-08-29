import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
// import img1 from '../../images/cards/pic__COLOR_pic-1.jpg';
// import img2 from '../../images/cards/pic__COLOR_pic-2.jpg';
// import img3 from '../../images/cards/pic__COLOR_pic.jpg';

function MoviesCardList({placeMovies, cards}) {
  return (
    <div className='movies-card-list'>
      {cards.map((card) => (
        <MoviesCard key={card.id}
                    img={`https://api.nomoreparties.co/.${card.image.url}`}
                    nameRU={card.nameRU}
                    imgAlt={card.image.alternativeText} 
                    duration={card.duration}
                    isSaved={false} 
                    placeMovies={placeMovies}/>
          ))}
{/* 
      <MoviesCard img={img1} isSaved={false} placeMovies={placeMovies}/>
      <MoviesCard img={img2} isSaved={false} placeMovies={placeMovies}/>
      <MoviesCard img={img3} isSaved={true} placeMovies={placeMovies}/> */}
      <button className='movies-card-list__load-more'>Ещё</button>
    </div>
  );
}
    
export default MoviesCardList;