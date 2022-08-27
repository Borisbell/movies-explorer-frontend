import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import me from '../../images/about-me/me.png';

function AboutMe() {
  return (
    <div className="about-me">
      <SectionHeader text="Студент"/>
      <div className="about-me__wrapper">
        <div className="about-me__content">
          <div className="about-me__texts">
            <h3 className="about-me__header">Бореслав</h3>
            <p className="about-me__subheader">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__bio">Я родился и живу в Москве, закончил лечебный факультет ПМГМУ. У меня есть жена 
  и кот. Недавно начал кодить. После того, как прошёл курс по веб-разработке, остался на постоянной работе и теперь гадаю зачем я всем этим занимался.</p>
          </div>
          <ul className="about-me__links">
              <li><a href="https://www.facebook.com/boris.belov.37/" 
                     className="about-me__link"
                     target="_blank"
                     rel="noreferrer noopener">
                     Facebook
                  </a>
              </li>
              <li><a href="https://github.com/Borisbell" 
                     className="about-me__link"
                     target="_blank"
                     rel="noreferrer noopener">
                     Github
                  </a>
              </li>
        </ul>
        </div>
        <img className="about-me__image" src={me} alt="Фотография симпатичного молодого человека"/>
      </div>
    </div>
  );
}
    
export default AboutMe;