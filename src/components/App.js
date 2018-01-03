import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import Header from './Header';
import PokemonsList from '../containers/PokemonsList';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header />
          <PokemonsList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
