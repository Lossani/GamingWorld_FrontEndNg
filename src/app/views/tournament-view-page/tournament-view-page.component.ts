import { Component, OnInit } from '@angular/core';
import {TournamentService} from "../../services/tournament.service";
import {Tournament} from "../../entities/tournament-entity";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-tournament-view-page',
  templateUrl: './tournament-view-page.component.html',
  styleUrls: ['./tournament-view-page.component.css']
})
export class TournamentViewPageComponent implements OnInit {

  tournament!: Tournament;
  tournamentId!: number;

  constructor(private tournamentService: TournamentService, private route:ActivatedRoute) {
    this.route.params.subscribe(params => {           this.tournamentId = params['id']         });
    tournamentService.getTournamentById(this.tournamentId).subscribe(data => {
      this.tournament = data;
      console.log(this.tournament)

    });
  }

  ngOnInit(): void {

  }

}
