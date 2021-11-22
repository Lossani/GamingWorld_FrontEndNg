import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Game } from 'src/app/entities/game-entity';

import { ProfileService } from 'src/app/services/profile.service';
import { TournamentExperience} from "../../../entities/profile-entity";

@Component({
  selector: 'app-create-game-experience-dialog',
  templateUrl: './create-tournament-dialog.component.html',
  styleUrls: ['./create-tournament-dialog.component.css']
})
export class CreateTournamentDialogComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl(''),
    position: new FormControl('')
  });

  games!: Game[];

  constructor(private matData: MatDialog,
    private profileService: ProfileService, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    if (this.data.editData!=undefined){
      this.formGroup.controls.name.setValue(this.data.editData.name);
      this.formGroup.controls.position.setValue(this.data.editData.position);
    }
  }

  submit() {
    if (!this.formGroup.valid)
      return;
    let tournament: TournamentExperience = {
      name: this.formGroup.controls.name.value,
      position: this.formGroup.controls.position.value,
    };
    this.data.next(tournament);
    this.matData.closeAll();

  }

}
