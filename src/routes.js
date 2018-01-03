const host = 'https://pokeapi.co/api/v1/pokemon';
const query = '?limit=100';

export default {
  pokemonsUrl: () => `${host}${query}`,
}
