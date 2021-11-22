import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ProfileService} from "../../../services/profile.service";
import {FormControl, FormGroup} from "@angular/forms";
import { StreamingCategory} from "../../../entities/profile-entity";

@Component({
  selector: 'app-create-stream-category-dialog',
  templateUrl: './create-stream-category-dialog.component.html',
  styleUrls: ['./create-stream-category-dialog.component.css']
})
export class CreateStreamCategoryDialogComponent implements OnInit {
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
    let streamingCategory: StreamingCategory = {
      name: this.formGroup.controls.name.value
    };
    this.data.next(streamingCategory);
    this.matData.closeAll();
  }
}
