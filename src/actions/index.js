import axios from 'axios';
import routes from '../routes';
import { createAction } from 'redux-actions';

export const fetchPokemonsRequest = createAction('POKEMONS_FETCH_REQUEST');
export const fetchPokemonsSuccess = createAction('POKEMONS_FETCH_SUCCESS');
export const fetchPokemonsFailure = createAction('POKEMONS_FETCH_FAILURE');

export const fetchPokemons = () => async (dispatch) => {
  dispatch(fetchPokemonsRequest());
  try {
    const url = routes.pokemonsUrl();
    const response = await axios.get(url);
    dispatch(fetchPokemonsSuccess({ pokemons: response.data}));
  } catch (e) {
    dispatch(fetchPokemonsFailure);
  }
}
