import {Component, OnInit} from '@angular/core';
import {PremiumInformationDialogComponent} from "../dialogs/premium-information-dialog/premium-information-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-premium-card',
  templateUrl: './premium-card.component.html',
  styleUrls: ['./premium-card.component.css']
})
export class PremiumCardComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openPremiumInfoDialog(): void{
    const dialogRef = this.dialog.open(PremiumInformationDialogComponent, {width:"30%"});
  }
}
