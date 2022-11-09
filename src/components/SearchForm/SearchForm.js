import React from 'react';
import Switcher from '../Switcher/Switcher';
import search from '../../images/search/search.svg';

function SearchForm({handleSearch, handleSearchData, isShort, handleShortMoviesChange, searchQue }) {
  const desktopSwitcher = document.querySelector('.search-form__switcher');
  if(window.innerWidth < 601) {
    desktopSwitcher.remove();
  }

  return (
    <div className="search-form__wrapper">
      <form 
        onSubmit={handleSearchData}
        className="search-form">
          <div className="search-form__input-group">
            <img src={search} 
                 alt="иконка поиска"
                 className="search-form__icon"
                 />
            <input id="movie" 
                   name="movie" 
                   type="text" 
                   onChange={handleSearch} 
                   className="search-form__input"
                   placeholder="Фильм" 
                   value={searchQue}   
                   required
                   />
          </div>
        <div className="search-form__controls">
          <button type="submit" 
                  className="search-form__submit">
                  Найти
          </button>
          <div className="search-form__controls-separator"></div>
        <div className="search-form__switcher">
          <Switcher isShort={isShort} handleShortMoviesChange={handleShortMoviesChange}/>
        </div>
        </div>
      </form>
        <div className="search-form__switcher_view_mobile">
          <Switcher />
        </div>
      <hr className='search-form__separator'/>
    </div>
  );
}
    
export default SearchForm;