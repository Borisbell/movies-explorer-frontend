import React from 'react';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__header">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a href="https://github.com/Borisbell/how-to-learn" className="portfolio__list-link">
            <p className="portfolio__list-text">Статичный сайт</p>
            <p className="portfolio__list-text">↗</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://github.com/Borisbell/russian-travel" className="portfolio__list-link">
            <p className="portfolio__list-text">Адаптивный сайт</p>
            <p className="portfolio__list-text">↗</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://github.com/Borisbell/react-mesto-api-full" className="portfolio__list-link">
            <p className="portfolio__list-text">Одностраничное приложение</p>
            <p className="portfolio__list-text">↗</p>
          </a>
        </li>
      </ul>
    </div>
  );
}
    
export default Portfolio;