import React from 'react';
import saved from '../../images/card/saved.svg';

function SaveButton({isSaved}) {
  return (
    <>
      { isSaved ?
      <img src={saved} alt="фильм сохранён"
           className="saved-badge"/>
      :
      <button className="save-button">Сохранить</button>
      }
    </>
  );
}
    
export default SaveButton;