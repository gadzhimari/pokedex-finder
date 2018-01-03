import React from 'react';
import './Preloader.css';

export default (props) => {
  const style = {
    width: `${props.width}px`,
    height: `${props.height}px`,
  };

  return (<div className="preloader">
    <div className="preloader__icon"
      style={style}></div>
  </div>)
}
