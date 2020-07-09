import { NgModule } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MainNavComponent } from '../components/main-nav/main-nav.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [MDBBootstrapModule.forRoot(), MaterialModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    DashboardComponent
],
  exports: [
    HeaderComponent,
    FooterComponent,
    DashboardComponent
  ]
})
export class SiteModule { }
