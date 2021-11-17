import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-end-tournament',
  templateUrl: './confirm-end-tournament.component.html',
  styleUrls: ['./confirm-end-tournament.component.css']
})
export class ConfirmEndTournamentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
  }

}
