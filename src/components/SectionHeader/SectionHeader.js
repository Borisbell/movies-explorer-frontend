import React from 'react';

function SectionHeader(props) {
  return (
    <p className="section-header">
        {props.text}
    </p>
  );
}
    
export default SectionHeader;