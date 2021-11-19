import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { NewsPageComponent } from './views/news-page/news-page.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { TournamentPageComponent } from './views/tournament-page/tournament-page.component';
import {TournamentViewPageComponent} from "./views/tournament-view-page/tournament-view-page.component";

const routes: Routes = [
  {path: '', component: NewsPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'tournaments', component: TournamentPageComponent},
  {path: 'sign-up', component: RegisterPageComponent},
  {path: 'profile/:profileCode', component: ProfilePageComponent},
  {path: 'tournaments/:id', component:TournamentViewPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
