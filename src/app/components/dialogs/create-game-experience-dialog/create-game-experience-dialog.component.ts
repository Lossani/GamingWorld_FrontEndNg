import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Game } from 'src/app/entities/game-entity';
import { GameService } from 'src/app/services/game.service';
import { ProfileService } from 'src/app/services/profile.service';
import {GameExperience} from "../../../entities/profile-entity";

@Component({
  selector: 'app-create-game-experience-dialog',
  templateUrl: './create-game-experience-dialog.component.html',
  styleUrls: ['./create-game-experience-dialog.component.css']
})
export class CreateGameExperienceDialogComponent implements OnInit {

  formGroup = new FormGroup({
    experienceLevel: new FormControl(''),
    gameId: new FormControl('')
  });

  games!: Game[];

  constructor(private matData: MatDialog,
    private gameService: GameService,
    private profileService: ProfileService, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(resGames => {
      this.games = resGames;
    });
  }

  submit() {
    if (!this.formGroup.valid)
      return;

    let gameExperience: GameExperience = {
      gameId: this.formGroup.controls.gameId.value,
      experienceLevel: this.formGroup.controls.experienceLevel.value,
      userId: this.data.userId
    };
    this.profileService.postGameExperience(gameExperience)
      .subscribe(val => {
        this.data.next();
        this.matData.closeAll();
      });
  }

}
