import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {

  }

  getPokemon() {
    return this.http.get(`${this.url}/pokemon?offset=0&limit=20`)
      .pipe(
        map(resp => resp['results'])
      );
  }
}
