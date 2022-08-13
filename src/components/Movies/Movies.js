import React, { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <Header loggedIn={true}/>
      <SearchForm />
      <Footer />
    </>
  );
}
    
export default Movies;