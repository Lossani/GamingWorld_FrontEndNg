import {Component, Inject, OnInit} from '@angular/core';
import {Team, UserCompetencia} from "../../../entities/user-entity";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'app-create-team-dialog',
  templateUrl: './create-team-dialog.component.html',
  styleUrls: ['./create-team-dialog.component.css']
})
export class CreateTeamDialogComponent implements OnInit {
  formGroup = new FormGroup({
    nombre: new FormControl(''),
    numeroMiembros: new FormControl('')
  });

  constructor(private matData: MatDialog,
              private profileService: ProfileService, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.formGroup.valid)
      return;

    let newTeam: Team = {
      userId: this.data.userId,
      nombre: this.formGroup.controls.nombre.value,
      numeroMiembros: this.formGroup.controls.numeroMiembros.value
    }

    this.profileService.postTeam(newTeam, this.data.userId).subscribe(response => {
      this.data.next();
      this.matData.closeAll();
    });
  }
}
