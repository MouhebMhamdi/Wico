import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { StripeModule } from "stripe-angular";
import { ProfileComponent } from './Pages/Personnel/profile/profile.component';
import { HistoriqueComponent } from './Pages/Personnel/historique/historique.component';
import { ClientprofileComponent } from './Pages/Client/clientprofile/clientprofile.component';
import { SignupComponent } from './Pages/auth/signup/signup.component'
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { HomeClientComponent } from './Pages/Admin/home-client/home-client.component';
import { HomeProjectsComponent } from './Pages/Admin/home-projects/home-projects.component';

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
    Page404Component,
    ProfileComponent,
    HistoriqueComponent,
    ClientprofileComponent,
    SignupComponent,
    HomeClientComponent,
    HomeProjectsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),NgbModule,
    BrowserAnimationsModule,
    CommonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    PdfViewerModule,
    PdfJsViewerModule,
    
    
    StripeModule.forRoot("pk_test_51KueAAKTa1h49sQ0Qi5ND9GQbZm3iXE80K37aKfKNydSl6oc692kjIV4f5Std18wT2pVL6zInXu7sj787J04anBV00W5B3LFzv")
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
