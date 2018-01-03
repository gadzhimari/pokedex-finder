import React from 'react';
import AppBar from 'material-ui/AppBar';

import './Header.css';

export default () => {
  return (<header className="header header_fixed">
    <div className="header__wrapper">
      <AppBar title={<span className="header__title">Pokedex</span>} />
    </div>
  </header>);
}
