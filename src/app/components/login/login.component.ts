import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  loginFailed: boolean = false;

  constructor(private oauthService: OAuthService, private router: Router) {
      let token = sessionStorage.getItem('access_token')
      console.log('token', token)
      if (token) {
          console.log('ok')
          this.router.navigate(['axa'])
      }
  }

  login() {
      this.oauthService.clientId = "WTAbfem86copOIQFsQZ5fUq8u2Ia"; //axa
      this.oauthService.initImplicitFlow();
  }

  logout() {
      this.oauthService.logOut();
  }

  ngOnInit() {
  }

}
