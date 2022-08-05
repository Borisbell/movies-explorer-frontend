import React from 'react';
import { Link } from 'react-router-dom';

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
                    <li>Яндекс.Практикум</li>
                    <li>Github</li>
                    <li>Facebook</li>
                </ul>
            </nav>
        </div>
    </footer>
  );
}
    
export default Footer;