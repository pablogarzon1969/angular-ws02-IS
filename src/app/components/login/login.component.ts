import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/app.reducer';
import * as auth from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  loginFailed: boolean = false;

  constructor(private oauthService: OAuthService, private router: Router, private store: Store<AppState>) {
    let token = sessionStorage.getItem('access_token');
    console.log('token', token);
    if (token) {
      console.log('ok');
      this.store.dispatch(auth.loggedIn({ isLogin: true }));
      this.router.navigate(['axa']);
    }
  }


  ngOnInit() {
  }

}
