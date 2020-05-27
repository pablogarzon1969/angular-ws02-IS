import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AxaComponent } from './components/axa/axa.component';
import { AuthGuard } from './core/auth.guard.service';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'axa', component: AxaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
