import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Game} from "../../../entities/game-entity";
import {FavoriteGame} from "../../../entities/profile-entity";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ProfileService} from "../../../services/profile.service";
import {GameService} from "../../../services/game.service";

@Component({
  selector: 'app-create-favorite-game-dialog',
  templateUrl: './create-favorite-game-dialog.component.html',
  styleUrls: ['./create-favorite-game-dialog.component.css']
})
export class CreateFavoriteGameDialogComponent implements OnInit {

  formGroup = new FormGroup({
    favoriteGames: new FormControl(''),
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
    if (this.data.editData!=undefined){
      this.formGroup.controls.favoriteGames.setValue(this.data.editData.favoriteGames);
      this.formGroup.controls.gameId.setValue(this.data.editData.gameId);
    }

  }

  submit() {
    if (!this.formGroup.valid)
      return;
    let favoriteGame: FavoriteGame = {
      gameId: this.formGroup.controls.gameId.value,
      userId: this.data.userId,
    };
    this.data.next(favoriteGame);
    this.matData.closeAll();

  }
}
