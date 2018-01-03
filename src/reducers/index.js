import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const pokemonsFetchingState = handleActions({
  [actions.fetchPokemonsRequest]() {
    return 'requested';
  },
  [actions.fetchPokemonsFailure]() {
    return 'failed';
  },
  [actions.fetchPokemonsSuccess]() {
    return 'successed';
  }
}, 'none');

const pokemons = handleActions({
  [actions.fetchPokemonsSuccess](state, { payload: { pokemons } }) {
    return [ ...state, ...pokemons.objects ];
  }
}, [])


export default combineReducers({
  pokemonsFetchingState,
  pokemons,
});
