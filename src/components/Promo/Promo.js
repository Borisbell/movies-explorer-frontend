import React from 'react';
import hero from '../../images/promo/hero-img.svg';

function Promo() {
  return (
    <div className="promo">
        <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
        <img src={hero} className="promo__bottom-row"/>
    </div>
  );
}
    
export default Promo;