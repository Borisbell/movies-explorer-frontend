import React from 'react';

function Switcher({isShort, handleShortMoviesChange}) {
  
  return (
    <div className="switcher__wrapper">
     <input type="checkbox" 
            checked={isShort}
            onChange={handleShortMoviesChange}
            id="switcher" 
            className="switcher__toggle"/>
     <label htmlFor="switcher">Короткометражки</label>
    </div>
  );
}
    
export default Switcher;
