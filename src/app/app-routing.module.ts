import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { NewsPageComponent } from './views/news-page/news-page.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';

const routes: Routes = [
  {path: '', component: NewsPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'sign-up', component: RegisterPageComponent},
  {path: 'profile', component: ProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
