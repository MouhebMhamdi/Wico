import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {APP_BASE_HREF} from '@angular/common';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { WelcomePageComponent } from './Pages/Home/welcome-page/welcome-page.component';
import { ServicesComponent } from './Pages/Home/services/services.component';
import { AboutComponent } from './Pages/Home/about/about.component';
import { ContactComponent } from './Pages/Home/contact/contact.component';
import { LoginComponent } from './Pages/auth/login/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientComponent } from './Pages/Client/client/client.component';
import { HomeComponent } from './Pages/Personnel/home/home.component';
import { HomeAdminComponent } from './Pages/Admin/home-admin/home-admin.component';
import { Page404Component } from './shared/page404/page404.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WelcomePageComponent,
    ServicesComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    ClientComponent,
    HomeComponent,
    HomeAdminComponent,
    Page404Component
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),NgbModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
