import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-signin-tournament',
  templateUrl: './confirm-signin-tournament.component.html',
  styleUrls: ['./confirm-signin-tournament.component.css']
})
export class ConfirmSigninTournamentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, public dialogRef: MatDialogRef<ConfirmSigninTournamentComponent>) { }

  ngOnInit(): void {
  }

}
