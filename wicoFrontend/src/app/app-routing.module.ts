import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './Pages/Admin/home-admin/home-admin.component';
import { LoginComponent } from './Pages/auth/login/login/login.component';
import { SignupComponent } from './Pages/auth/signup/signup.component';
import { ClientComponent } from './Pages/Client/client/client.component';
import { ClientprofileComponent } from './Pages/Client/clientprofile/clientprofile.component';
import { WelcomePageComponent } from './Pages/Home/welcome-page/welcome-page.component';
import { HistoriqueComponent } from './Pages/Personnel/historique/historique.component';
import { HomeComponent } from './Pages/Personnel/home/home.component';
import { ProfileComponent } from './Pages/Personnel/profile/profile.component';
import { Page404Component } from './shared/page404/page404.component';

const routes: Routes = [
  {path:"",component:WelcomePageComponent},
  {path:"login",component:LoginComponent},
  {path:"client",component:ClientComponent},
  {path:"personnel",component:HomeComponent},
  {path:"Admin",component:HomeAdminComponent},
  {path:"personnel/profile",component:ProfileComponent},
  {path:"client/profile",component:ClientprofileComponent},
  {path:"personnel/history",component:HistoriqueComponent},
  {path:"signup",component:SignupComponent},
  {path:"**",component:Page404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
