import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './Pages/Admin/home-admin/home-admin.component';
import { LoginComponent } from './Pages/auth/login/login/login.component';
import { ClientComponent } from './Pages/Client/client/client.component';
import { WelcomePageComponent } from './Pages/Home/welcome-page/welcome-page.component';
import { HomeComponent } from './Pages/Personnel/home/home.component';
import { Page404Component } from './shared/page404/page404.component';

const routes: Routes = [
  {path:"",component:WelcomePageComponent},
  {path:"login",component:LoginComponent},
  {path:"client",component:ClientComponent},
  {path:"personnel",component:HomeComponent},
  {path:"Admin",component:HomeAdminComponent},
  {path:"**",component:Page404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
