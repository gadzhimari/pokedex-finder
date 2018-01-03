import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

import Preloader from './preloader/Preloader';
import './PokemonsList.css';

const filters = [
  ['all', 'All Types'],
  ['normal', 'Normal'],
  ['fighting', 'Fighting'],
  ['flying', 'Flying'],
  ['poison', 'Poison'],
  ['ground', 'Ground'],
  ['rock', 'Rock'],
  ['ghost', 'Ghost'],
  ['steel', 'Steel'],
  ['fire', 'Fire'],
  ['water', 'Water'],
  ['grass', 'Grass'],
  ['electric', 'Electric'],
  ['psychic', 'Psychic'],
  ['ice', 'Ice'],
  ['dragon', 'Dragon'],
  ['dark', 'Dark'],
  ['fairy', 'Fairy']
];

export default class PokemonsList extends Component {
  state = {
    searchTerm: '',
    activeFilter: 'all',
  }

  applyFilter = (event, index, value) => {
    this.setState({ activeFilter: value });
  }

  findPokemon = (event, value) => {
    this.setState({ searchTerm: value });
  }

  componentDidMount() {
    this.props.fetchPokemons();
  }

  render() {
    const { pokemonsFetchingState } = this.props;

    return (
      pokemonsFetchingState === 'successed' ? this.renderApp() : this.renderPreloader()
    )
  }

  renderPreloader() {
    const size = {
      width: 200,
      height: 200,
    };

    return <Preloader {...size}/>;
  }

  renderApp() {
    const styles = {
      width: '70%',
      margin: '0 20px 0 0',
    };

    return (<div className="pokemon-app">
      <div className="filters">
        <div className="filters__wrapper">
          <TextField hintText="Search pokemons by name"
            onChange={this.findPokemon}
            name="search"
            style={styles}>
          </TextField>
          <SelectField floatingLabelText="Type"
            onChange={this.applyFilter}
            value={this.state.activeFilter}>
            { filters.map((filter, index) => this.renderFilter(filter, index)) }
          </SelectField>
        </div>
      </div>
      {this.renderPokemons()}
    </div>
    )
  }

  renderFilter([state, type], index) {
    return <MenuItem key={index} value={state} primaryText={type}></MenuItem>
  }

  renderPokemons() {
    const rawPokemons = this.props.pokemons;
    const filter = this.state.activeFilter;
    const searchTerm = this.state.searchTerm;
    let pokemons;

    if (filter === 'all') {
      pokemons = rawPokemons;
    } else {
      pokemons = rawPokemons.filter(pokemon => {
        const containsType = _.find(pokemon.types, function(type) {
          return type.name === filter
        });
        return containsType;
      });
    }

    const data = pokemons
      .filter(pokemon => pokemon.name.includes(searchTerm))
      .map(pokemon => {
        return {
          avatar: {
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pkdx_id}.png`,
            text: pokemon.name,
          },
          name: pokemon.name,
          type: pokemon.types.map(t => t.name),
          weight: pokemon.weight,
          height: pokemon.height,
          speed: pokemon.speed,
          sp_def: pokemon.sp_def,
          sp_atk: pokemon.sp_atk,
          defense: pokemon.defense,
          attack: pokemon.attack,
          hp: pokemon.hp
        };
    });

    const columns = [{
        Header: 'Avatar',
        accessor: 'avatar',
        Cell: props => <img src={props.value.img} alt={props.value.text}/>,
      }, {
        Header: 'Name',
        accessor: 'name',
      }, {
        Header: 'Type',
        accessor: 'type',
        Cell: props => props.value.map((t, i) => <div key={i}>{t}</div>),
      }, {
        Header: 'Weight',
        accessor: 'weight',
      }, {
        Header: 'Height',
        accessor: 'height',
      }, {
        Header: 'Speed',
        accessor: 'speed',
      }, {
        Header: 'Special Defense',
        accessor: 'sp_def',
      }, {
        Header: 'Special Attack',
        accessor: 'sp_atk',
      }, {
        Header: 'Defense',
        accessor: 'defense',
      }, {
        Header: 'Attack',
        accessor: 'attack',
      }, {
        Header: 'HP',
        accessor: 'hp',
    }];

    return (<div className="pokemon-list">
      <div className="pokemon-list__wrapper">
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}/>
      </div>
    </div>);
  }
}
