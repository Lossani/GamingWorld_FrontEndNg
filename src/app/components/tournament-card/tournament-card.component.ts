import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tournament } from 'src/app/entities/tournament-entity';
import {Game} from "../../entities/game-entity";
import { Router } from '@angular/router';


@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {

  @Input()
  tournament: Tournament = {} as Tournament;
  game?: Game;


  tournamentHour?: string;
  tournamentDate?: string;

  constructor(private dialog: MatDialog, public router: Router) {
  }



  ngOnInit(): void {
    let tDate = new Date(this.tournament.tournamentDate);
    this.tournamentDate = tDate.getFullYear()+'-'+(tDate.getMonth()+1)+'-'+tDate.getDate();
    this.tournamentHour = tDate.getHours() + ":" + tDate.getMinutes();
  }


  compareDates(){
    let date1: Date = new Date();
    let comp: number = 0;
    let tDate = new Date(this.tournament.tournamentDate);
    if (date1 < tDate) {
            comp = 1;
    }
    else{
            comp = 2;
    }
    return comp;
  }

}
