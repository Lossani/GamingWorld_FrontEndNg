import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsPageComponent } from './views/news-page/news-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { PremiumInformationDialogComponent } from './components/dialogs/premium-information-dialog/premium-information-dialog.component';
import { TwitchBubbleComponent } from './components/twitch-bubble/twitch-bubble.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { ConfirmDeleteDialogComponent } from './components/dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { CreateGameExperienceDialogComponent } from './components/dialogs/create-game-experience-dialog/create-game-experience-dialog.component';
import { CreateTournamentDialogComponent } from "./components/dialogs/create-tournament-dialog/create-tournament-dialog.component";
import { TournamentPageComponent } from './views/tournament-page/tournament-page.component';
import { TournamentCardComponent } from './components/tournament-card/tournament-card.component';
import { ConfirmSigninTournamentComponent } from './components/dialogs/confirm-signin-tournament/confirm-signin-tournament.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CreateTeamDialogComponent } from './components/dialogs/create-team-dialog/create-team-dialog.component';
import { AddMembersDialogComponent } from './components/dialogs/add-members-dialog/add-members-dialog.component';
import { CreateFavoriteGameDialogComponent } from './components/dialogs/create-favorite-game-dialog/create-favorite-game-dialog.component';
import { TournamentViewPageComponent } from './views/tournament-view-page/tournament-view-page.component';
import { PremiumCardComponent } from './components/premium-card/premium-card.component';
import { ConfirmEndTournamentComponent } from './components/dialogs/confirm-end-tournament/confirm-end-tournament.component';
import { RegisterMatchPointsComponent } from './components/dialogs/register-match-points/register-match-points.component';
import { MatChipsModule } from "@angular/material/chips";
import {SessionService} from "./services/session.service";
import { SearchGamesComponent } from './components/searchers/search-games/search-games.component';
import { CreateStreamSponsorDialogComponent } from './components/dialogs/create-stream-sponsor-dialog/create-stream-sponsor-dialog.component';
import { CreateStreamCategoryDialogComponent } from './components/dialogs/create-stream-category-dialog/create-stream-category-dialog.component';
import { LoginOrSignupComponent } from './components/dialogs/login-or-signup/login-or-signup/login-or-signup.component';
import { ConfirmUserRegistrationComponent } from './components/dialogs/confirm-user-registration/confirm-user-registration.component';
<<<<<<< HEAD
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchUsersComponent } from './components/searchers/search-users/search-users.component';
=======
>>>>>>> parent of 8957698 (Merge branch 'feature/internationalization' into develop)



@NgModule({

  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NewsPageComponent,
    NewsCardComponent,
    PremiumInformationDialogComponent,
    TwitchBubbleComponent,
    ProfilePageComponent,
    ConfirmDeleteDialogComponent,
    CreateGameExperienceDialogComponent,
    CreateTournamentDialogComponent,
    TournamentPageComponent,
    TournamentCardComponent,
    ConfirmSigninTournamentComponent,
    CreateTeamDialogComponent,
    AddMembersDialogComponent,
    TournamentViewPageComponent,
    PremiumCardComponent,
    ConfirmEndTournamentComponent,
    RegisterMatchPointsComponent,
    CreateFavoriteGameDialogComponent,
    SearchGamesComponent,
    CreateStreamSponsorDialogComponent,
    CreateStreamCategoryDialogComponent,
    LoginOrSignupComponent,
    ConfirmUserRegistrationComponent,
    SearchUsersComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
<<<<<<< HEAD
    MatChipsModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule,
=======
    MatChipsModule
>>>>>>> parent of 8957698 (Merge branch 'feature/internationalization' into develop)

  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
