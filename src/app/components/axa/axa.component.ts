import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';



@Component({
  selector: 'app-axa',
  templateUrl: './axa.component.html',
  styleUrls: ['./axa.component.css']
})
export class AxaComponent implements OnInit {

  userProfile: object;
  private scripts: any = {};

  constructor(
    private oauthService: OAuthService,
    private router: Router) {
    console.log('ok2');
  }

  ngOnInit() {

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
