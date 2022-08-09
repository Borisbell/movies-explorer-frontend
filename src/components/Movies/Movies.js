import React, { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {
  return (
    <>
      <Header loggedIn={true}/>
      <SearchForm />
    </>
  );
}
    
export default Movies;