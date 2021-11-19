import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Game } from 'src/app/entities/game-entity';
import { GameService } from 'src/app/services/game.service';
import { ProfileService } from 'src/app/services/profile.service';
import {UserCompetencia} from "../../../entities/profile-entity";

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

    let newTournamente: UserCompetencia = {
      name: this.formGroup.controls.nombre.value,
      date: (new Date(this.formGroup.controls.date.value)).toISOString().split('T')[0],
      position: this.formGroup.controls.puesto.value
    }

    this.profileService.postTournament(newTournamente, this.data.userId).subscribe(res => {
      this.data.next();
      this.matData.closeAll();
    });
  }

}
