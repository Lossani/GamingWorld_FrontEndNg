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
  tournament?: Tournament;
  game?: Game;

  constructor(private dialog: MatDialog, public router: Router) { }



  ngOnInit(): void {
  }



}
