import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import * as usuarioAction from '../../store/actions/usuarios.actions';
import * as pokemonAction from '../../store/actions/pokemon.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Usuario } from '../../models/usuario.model';
import { Pokemon } from '../../models/pokemon.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userProfile: object;
  private scripts: any = {};
  usuarios: Usuario[] = [];

  pokemones: Pokemon[] = [];
  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private store: Store<AppState>) {
    console.log('ok2');
  }

  ngOnInit() {


    this.store.select('usuarios')
      .subscribe(({ users }) => {
        this.usuarios = users;
        console.log(this.usuarios);
      });

    this.store.select('pokemones')
      .subscribe(({ pokemon }) => {
        this.pokemones = pokemon;
        console.log(this.pokemones);
      });

    this.store.dispatch(usuarioAction.cargarUsuarios());

    this.store.dispatch(pokemonAction.cargarPokemones());
  }

  set requestAccessToken(value: boolean) {
    this.oauthService.requestAccessToken = value;
    localStorage.setItem('requestAccessToken', '' + value);
  }

  get requestAccessToken() {
    return this.oauthService.requestAccessToken;
  }

  get id_token() {
    return this.oauthService.getIdToken();
  }

  get access_token() {
    return this.oauthService.getAccessToken();
  }

  get id_token_expiration() {
    return this.oauthService.getIdTokenExpiration();
  }

  get access_token_expiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

  loadUserProfile(): void {
    this
      .oauthService
      .loadUserProfile()
      .then(up => this.userProfile = up);
  }

  logout() {
    this.oauthService.logOut();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  testSilentRefresh() {
    this.oauthService.oidc = true;
    this
      .oauthService
      .silentRefresh()
      .then(info => console.log('pablo refresh ok', info))
      .catch(err => console.error('pablo refresh error', err));
  }
}
