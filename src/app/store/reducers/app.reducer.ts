import { ActionReducerMap } from '@ngrx/store';
import * as auth from '../reducers/auth.reducer';
import * as usuarios from './usuarios.reducer';
import * as pokemones from './pokemon.reducer';


export interface AppState {
  user: auth.State;
  usuarios: usuarios.UsuariosState;
  pokemones: pokemones.PokemonState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: auth.authReducer,
  usuarios: usuarios.usuariosReducer,
  pokemones: pokemones.pokemonesReducer
}
