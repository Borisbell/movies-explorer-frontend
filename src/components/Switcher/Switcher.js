import React, { useState } from 'react';

function Switcher(props) {
  return (
    <div className="switcher__wrapper">
     <input type="checkbox" id="switcher" className="switcher__toggle"/>
     <label htmlFor="switcher">Короткометражки</label>
    </div>
  );
}
    
export default Switcher;
