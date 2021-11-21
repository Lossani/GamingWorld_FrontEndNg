import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Game } from 'src/app/entities/game-entity';
import { GameService } from 'src/app/services/game.service';
import { ProfileService } from 'src/app/services/profile.service';
import {GameExperience, TournamentExperience} from "../../../entities/profile-entity";

@Component({
  selector: 'app-create-game-experience-dialog',
  templateUrl: './create-tournament-dialog.component.html',
  styleUrls: ['./create-tournament-dialog.component.css']
})
export class CreateTournamentDialogComponent implements OnInit {

  formGroup = new FormGroup({
    nombre: new FormControl(''),
    date: new FormControl(''),
    puesto: new FormControl('')
  });

  games!: Game[];

  constructor(private matData: MatDialog,
    private profileService: ProfileService, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.formGroup.valid)
      return;
    let tournament: TournamentExperience = {
      name: this.formGroup.controls.nombre.value,
      position: this.formGroup.controls.puesto.value,
    };
    this.data.next(tournament);
    this.matData.closeAll();

  }

}
