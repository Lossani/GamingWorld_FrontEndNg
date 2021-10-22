import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tournament } from 'src/app/entities/tournament-entity';
import { ConfirmSigninTournamentComponent } from '../dialogs/confirm-signin-tournament/confirm-signin-tournament.component';
import {Game} from "../../entities/game-entity";


@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {

  @Input()
  tournament?: Tournament;
  game?: Game;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openConfirmRegistration() {
    const dialogRef = this.dialog.open(ConfirmSigninTournamentComponent, {
      data: {
        title: this.tournament?.title
      }
    });
  }
}
