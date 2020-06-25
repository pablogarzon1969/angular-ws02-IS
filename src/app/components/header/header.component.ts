import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/app.reducer';
import * as auth from '../../store/actions/auth.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  uiSubscription: Subscription;
  cargando: boolean = false;

  loggedIn = this.store.select(state => state.user.isLoading);

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('user')
      .subscribe(user => {
        this.cargando = user.isLoading;
      });
  }

  login() {
    this.oauthService.initImplicitFlow();
    //this.oauthService.logoutUrl = 'https://localhost:9443/oidc/logout';

  }

  logout() {
    this.oauthService.logOut();
    this.store.dispatch(auth.loggedIn({ isLogin: false }));
    this.router.navigate(['/']);
  }

  logoutExternally() {
    window.open(this.oauthService.logoutUrl);
    window.open(`https://localhost:9443/oidc/logout`);
  }

}
