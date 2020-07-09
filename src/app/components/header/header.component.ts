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
  public userName: string;

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
    this.userName = this.getUserName();
  }

  login() {
    this.oauthService.initImplicitFlow();
    //this.oauthService.logoutUrl = 'https://localhost:9443/oidc/logout';

  }

  logout() {
    this.store.dispatch(auth.loggedIn({ isLogin: false }));
    this.oauthService.logOut();
    this.router.navigate(['/']);
  }

  logoutExternally() {
    window.open(this.oauthService.logoutUrl);
    window.open(`https://localhost:9443/oidc/logout`);
  }

  public getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  public getUserClaims(): object {
    return this.oauthService.getIdentityClaims();
  }

  public getUserInfo(): string {
    const idToken = this.oauthService.getIdToken();
    if (idToken !== null) {
      console.log('id token ', idToken);
      return typeof idToken['sub'] !== 'undefined' ? idToken['sub'].toString() : '';
    }
  }



  public getUserName(): string {

    const accessToken = this.getAccessToken();
    const claims = this.getUserClaims();
    if(claims !== null){
    console.log('access token ', accessToken);
    this.getUserInfo();
    return claims['sub'].split('@')[0];
    }

  }

}
