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
  });

  selectedGame: any;

  games!: Game[];

  constructor(private matData: MatDialog,
    private gameService: GameService,
    private profileService: ProfileService, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(resGames => {
      this.games = resGames;
    });
    if (this.data.editData!=undefined){
      this.formGroup.controls.experienceLevel.setValue(this.data.editData.experienceLevel);
      this.formGroup.controls.gameId.setValue(this.data.editData.gameId);
    }
  }

  receiveMessage($event:any) {
    // this.registerForm.controls.game = $event;
    if($event!=[]){
      this.selectedGame = $event
    }

    console.log($event)
  }

  submit() {
    if (!this.formGroup.valid)
      return;

    // let gameExperience: GameExperience = {
    //   gameId: this.games[this.formGroup.controls.gameId.value].id,
    //   gameName: this.games[this.formGroup.controls.gameId.value].name,
    //   experience: this.formGroup.controls.experienceLevel.value,
    //   userId: this.data.userId
    // };
    let gameExperience: GameExperience = {
      gameId: this.selectedGame.id,
      gameName: this.selectedGame.name,
      experience: this.formGroup.controls.experienceLevel.value,
      userId: this.data.userId
    };

    this.data.next(gameExperience);
    this.matData.closeAll();
  }

}
