import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className='page-not-found'>
      <h1 className='page-not-found__header'>404</h1>
      <p className='page-not-found__subheader'>Страница не найдена</p>
      <button className='page-not-found__back'
              onClick={() => navigate(-1)}>
              Назад
      </button>
    </div>
  );
}
    
export default PageNotFound;