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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
