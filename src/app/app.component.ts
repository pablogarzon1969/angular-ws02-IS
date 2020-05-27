import { Component } from '@angular/core';
import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { authConfig } from './oauth2.config';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tokenSubscription: Subscription;
  constructor(private oauthService: OAuthService) {
    this.configure();
    if (this.oauthService.events
      .pipe(filter(e => e.type === 'token_expires'))) {
      this.refreshTokenOnLoadIfNeeded();
    }

    /* this
       .oauthService
       .events
       .filter(e => e.type === 'token_expires')
       .subscribe(e => {
         console.log('received token_expires event', e);
         console.log('received token_expires event', e);
         this.oauthService.silentRefresh();
       });*/
  }
  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.tryLogin({});
  }

  private async  refreshTokenOnLoadIfNeeded() {
    this.oauthService.setupAutomaticSilentRefresh();
    this.tokenSubscription = this.oauthService.events.subscribe(e => {
      if (e instanceof OAuthErrorEvent) { console.error(e); }
      else { console.warn(e); }
    });
  }


}

