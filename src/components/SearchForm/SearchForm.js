import React, { useState } from 'react';
import Switcher from '../Switcher/Switcher';
import search from '../../images/search/search.svg';

function SearchForm(props) {
  return (
    <div className="search-form__wrapper">
      <div className="search-form">
          <div className="search-form__input-group">
            <img src={search} alt="иконка поиска"/>
            <input id="movie" 
                      name="movie" 
                      type="text" 
                      //  value={} 
                      //  onChange={} 
                      className="search-form__input"
                      placeholder="Фильм"    
                      required
                      />
          </div>
        <div className="search-form__controls">
          <button type="submit" 
                  className="search-form__submit">
                  Найти
          </button>
          <div className="search-form__controls-separator"></div>
        <Switcher />
        </div>
      </div>
      <hr className='search-form__separator'/>
    </div>
  );
}
    
export default SearchForm;