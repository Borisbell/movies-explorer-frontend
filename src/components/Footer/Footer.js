import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className='footer__top-row'>
        <p className='footer__header'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>
      <div className='footer__bottom-row'>
        <p className='footer__year'>@ 2022</p>
        <nav>
          <ul className='footer__bottom-nav'>
            <li>
              <a href='https://practicum.yandex.ru/catalog/free/'
                 className='footer__bottom-link'
                 target="_blank"
                 rel="noreferrer noopener">
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a href='https://github.com/Borisbell'
                 className='footer__bottom-link'
                 target="_blank"
                 rel="noreferrer noopener">
                Github
               </a>
            </li>
            <li>
              <a href='https://www.facebook.com/boris.belov.37'
                 className='footer__bottom-link'
                 target="_blank"
                 rel="noreferrer noopener">
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
    
export default Footer;