import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Game} from "../../../entities/game-entity";

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

  constructor() { }

  ngOnInit(): void {
  }

}
