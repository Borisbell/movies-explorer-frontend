import React from 'react';
import deleteIcon from '../../images/card/delete.svg';

function DeleteButton({handleDelete}) {
  return (
    <>
      <button className="delete-badge"
              onClick={handleDelete}>
              <img src={deleteIcon} alt="кнопка удалить"
           />
      </button>
    </>
  );
}
    
export default DeleteButton;