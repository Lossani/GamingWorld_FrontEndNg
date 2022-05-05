import {Component, Inject, OnInit} from '@angular/core';
import {StreamerSponsor} from "../../../entities/profile-entity";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'app-create-stream-sponsor-dialog',
  templateUrl: './create-stream-sponsor-dialog.component.html',
  styleUrls: ['./create-stream-sponsor-dialog.component.css']
})
export class CreateStreamSponsorDialogComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(private matData: MatDialog,
              private profileService: ProfileService, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    if (this.data.editData!=undefined){
      this.formGroup.controls.name.setValue(this.data.editData.name);
    }
  }

  submit() {
    if (!this.formGroup.valid)
      return;
    let streamerSponsor: StreamerSponsor = {
      name: this.formGroup.controls.name.value,
      userId: this.data.userId,
    };
    this.data.next(streamerSponsor);
    this.matData.closeAll();

  }
}
