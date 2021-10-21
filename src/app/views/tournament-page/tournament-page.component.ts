import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Game } from 'src/app/entities/game-entity';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css']
})
export class TournamentPageComponent implements OnInit {

  games!: Game[];

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

  constructor(private gameService: GameService) { 
    gameService.getGames().subscribe(data => {
      this.games = data;
    });
  }

  ngOnInit(): void {
    
  }

}
