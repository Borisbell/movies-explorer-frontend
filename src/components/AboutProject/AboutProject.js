import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';

function AboutProject() {
  return (
    <div className="about-project">
      <SectionHeader text="О проекте"/>
      <div className="about__content">
      <div className="about__content-column">
        <h3 className="about__content-header">Дипломный проект включал 5 этапов</h3>
        <p className="about__content-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className="about__content-column">
        <h3 className="about__content-header">На выполнение диплома ушло 5 недель</h3>
        <p className="about__content-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      </div>
      <div className="about__timing">
      <div className="about__timing-column-s">
        <p className="about__timing-weeks about__timing-weeks_style_green">1 неделя</p>
        <p className="about__timing-subhead">Back-end</p>
      </div>
      <div className="about__timing-column-l">
        <p className="about__timing-weeks">4 недели</p>
        <p className="about__timing-subhead">Front-end</p>
      </div>  
      </div>
    </div>
  );
}
    
export default AboutProject;