import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from 'src/app/entities/game-entity';
import { GameService } from 'src/app/services/game.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Competencia, GameExperience, UserCompetencia } from 'src/app/entities/user-entity';

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

  constructor(@Inject(MAT_DIALOG_DATA) private matData: any,
    private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  submit() {
    let newTournamente: UserCompetencia = {
      nombre: this.formGroup.controls.nombre.value,
      date: (new Date(this.formGroup.controls.date.value)).toISOString().split('T')[0],
      puesto: this.formGroup.controls.puesto.value
    }
    this.profileService.postTournament(newTournamente, this.matData.userId).subscribe(res => {
      this.matData.next();
    });
  }

}
