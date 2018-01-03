import { connect } from 'react-redux';
import Component from '../components/PokemonsList';
import * as actionCreators from '../actions';

const mapStateToProps = ({ pokemons, pokemonsFetchingState }) => {
  const props = {
    pokemons,
    pokemonsFetchingState
  };

  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
