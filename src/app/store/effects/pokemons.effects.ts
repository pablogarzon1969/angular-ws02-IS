import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as pokemonesActions from '../actions/pokemon.actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { PokemonService } from '../../services/pokemon.service';
import { of } from 'rxjs';


@Injectable()
export class PokemonesEffects {

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) { }


  cargarPokemones$ = createEffect(
    () => this.actions$.pipe(
      ofType(pokemonesActions.cargarPokemones),
      mergeMap(
        () => this.pokemonService.getPokemon()
          .pipe(
            map(poke => pokemonesActions.cargarPokemonesSuccess({ pokemones: poke })),
            catchError(err => of(pokemonesActions.cargarPokemonesError({ payload: err })))
          )
      )
    )
  );

}
