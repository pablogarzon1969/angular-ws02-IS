import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../../models/pokemon.model';

export const cargarPokemones = createAction('[Pokemones] Cargar Pokemon');

export const cargarPokemonesSuccess = createAction(
    '[Pokemones] Cargar Pokemones Success',
    props<{ pokemones: Pokemon[] }>()
);

export const cargarPokemonesError = createAction(
    '[Pokemones] Cargar Pokemones Error',
    props<{ payload: any }>()
);
