import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from 'src/app/entities/game-entity';
import { GameService } from 'src/app/services/game.service';
import { ProfileService } from 'src/app/services/profile.service';
import { GameExperience } from 'src/app/entities/user-entity';

@Component({
  selector: 'app-create-game-experience-dialog',
  templateUrl: './create-tournament-dialog.component.html',
  styleUrls: ['./create-tournament-dialog.component.css']
})
export class CreateTournamentDialogComponent implements OnInit {

  formGroup = new FormGroup({
    experienceLevel: new FormControl(''),
    gameId: new FormControl('')
  });

  games!: Game[];

  constructor(@Inject(MAT_DIALOG_DATA) private matData: any,
    private gameService: GameService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(resGames => {
      this.games = resGames;
    });
  }

  submit() {
    let gameExperience: GameExperience = {
      gameId: this.formGroup.controls.gameId.value,
      experienceLevel: this.formGroup.controls.experienceLevel.value,
      usuarioId: this.matData.userId
    };
    this.profileService.postGameExperience(gameExperience)
      .subscribe(val => {
        this.matData.next();
      });
  }

}
