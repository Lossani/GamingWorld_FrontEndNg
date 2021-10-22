import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Game } from 'src/app/entities/game-entity';
import { GameService } from 'src/app/services/game.service';
import {TournamentService} from "../../services/tournament.service";
import {Tournament} from "../../entities/tournament-entity";
import {MatDialog} from "@angular/material/dialog";
import {PremiumInformationDialogComponent} from "../../components/dialogs/premium-information-dialog/premium-information-dialog.component";

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css']
})
export class TournamentPageComponent implements OnInit {

  games!: Game[];
  tournaments!: Tournament[];

  newTournament = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    game: new FormControl(''),
    isTeam: new FormControl(false),
    teamTournament: new FormGroup({
      teamQuantity: new FormControl('')
    }),
    soloTournament: new FormGroup({
      playerCapacity: new FormControl('')
    })
  });

  constructor(private gameService: GameService, private tournamentService: TournamentService, public dialog: MatDialog) {
    gameService.getGames().subscribe(data => {
      this.games = data;
    });
    tournamentService.getTournaments().subscribe(data => {
      this.tournaments = data;
    });

  }

  ngOnInit(): void {

  }
  openPremiumInfoDialog(): void{
    const dialogRef = this.dialog.open(PremiumInformationDialogComponent);
  }

}
