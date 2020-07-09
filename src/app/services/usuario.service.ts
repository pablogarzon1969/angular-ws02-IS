import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //private url = 'https://pokeapi.co/api/v2';
  private url = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    //return this.http.get(`${this.url}/pokemon?offset=0&limit=20`)
    return this.http.get(`${ this.url }/users?per_page=6&delay=3`)
      .pipe(
       // map( resp => resp['results'])
        map( resp => resp['data'])

      );
  }
}
