import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeGuestComponent } from './users/home-guest/home-guest.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { LoginComponent } from './users/login/login.component';
const routes: Routes = [
  { path: '',   component:HomeGuestComponent},
  {path:'sign_up', component: SignUpComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
