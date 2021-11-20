import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tournament } from 'src/app/entities/tournament-entity';
import { Router } from '@angular/router';
import {GameService} from "../../services/game.service";


@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {

  @Input()
  tournament: Tournament = {} as Tournament;
  tournamentGameName: string = "";


  tournamentHour?: string;
  tournamentDate?: string;

  constructor(private dialog: MatDialog, public router: Router, private gameService: GameService) {

  }

  ngOnChanges(): void{
    this.getDate();
    this.getHour()
    if(this.tournament.gameId){
      this.gameService.getGameById(this.tournament.gameId).subscribe(data=>{
        console.log(data)
        this.tournamentGameName = data.name;
      })
    }

    console.log(this.tournamentGameName)
  }

  ngOnInit(): void {

  }

  getDate(){
    let tDate = new Date(this.tournament.tournamentDate);
    this.tournamentDate = tDate.getFullYear()+'-'+(tDate.getMonth()+1)+'-'+tDate.getDate();
  }
  getHour(){
    let tDate = new Date(this.tournament.tournamentDate);
    this.tournamentHour = tDate.getHours() + ":" + tDate.getMinutes();
  }


  compareDates(){
    let date1: Date = new Date();
    let tDate = new Date(this.tournament.tournamentDate);
    return (date1 < tDate);
  }

}
