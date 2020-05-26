import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

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


  ngOnInit() {
  }

}
