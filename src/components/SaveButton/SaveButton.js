import React from 'react';
import saved from '../../images/card/saved.svg';

function SaveButton({isSaved, handleSave, handleDelete}) {
  return (
    <>
      { isSaved ?
      <img src={saved} 
           onClick={handleDelete}
           alt="фильм сохранён"
           className="saved-badge"/>
      :
      <button className="save-button"
              onClick={handleSave}
        >Сохранить</button>
      }
    </>
  );
}
    
export default SaveButton;