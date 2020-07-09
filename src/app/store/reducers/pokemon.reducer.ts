import { createReducer, on } from '@ngrx/store';
import { cargarPokemones, cargarPokemonesError, cargarPokemonesSuccess } from '../actions/pokemon.actions';
import { Pokemon } from '../../models/pokemon.model';

export interface PokemonState {
  pokemon: Pokemon[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const pokemonesInitialState: PokemonState = {
  pokemon: [],
  loaded: false,
  loading: false,
  error: null
}

const pokemonesInitialReducer = createReducer(pokemonesInitialState,

  on(cargarPokemones, state => ({ ...state, loading: true })),
  on(cargarPokemonesSuccess, (state, { pokemones }) => ({
    ...state,
    loading: false,
    loaded: true,
    pokemon: [...pokemones]
  })),
  on(cargarPokemonesError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  })),
);

export function pokemonesReducer(state, action) {
  return pokemonesInitialReducer(state, action);
}
