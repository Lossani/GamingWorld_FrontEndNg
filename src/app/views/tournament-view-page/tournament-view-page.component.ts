import { Component, OnInit } from '@angular/core';
import {TournamentService} from "../../services/tournament.service";
import {Tournament} from "../../entities/tournament-entity";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmEndTournamentComponent} from "../../components/dialogs/confirm-end-tournament/confirm-end-tournament.component";
import {RegisterMatchPointsComponent} from "../../components/dialogs/register-match-points/register-match-points.component";



@Component({
  selector: 'app-tournament-view-page',
  templateUrl: './tournament-view-page.component.html',
  styleUrls: ['./tournament-view-page.component.css']
})
export class TournamentViewPageComponent implements OnInit {

  tournament!: Tournament;
  tournamentId!: number;
  participants: any[] = [
    {id: 1, name: "Manuel Garcia", points: 0},
    {id: 2, name: "Javier Merino", points: 0},
    {id: 3, name: "Paolo Pinzas", points: 10}
  ];



  constructor(private tournamentService: TournamentService, private route: ActivatedRoute, public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.tournamentId = params['id']
    });
    tournamentService.getTournamentById(this.tournamentId).subscribe(data => {
      this.tournament = data;
      console.log(this.tournament)


    });
  }

  ngOnInit(): void {

  }

  endTournament() {
    const dialogRef = this.dialog.open(ConfirmEndTournamentComponent, {
      data: {
        title: this.tournament?.title
      }
    });

  }

  registerPoints() {
    const dialogRef = this.dialog.open(RegisterMatchPointsComponent, {

      data: {
        title: this.tournament?.title,
        participants:this.participants
      }
    });

  }




  sortParticipants(participants: any[]){
    participants.sort( (a,b) => {
      if ((a.points) > (b.points))
        return -1;
      if ((a.points) < (b.points))
        return 1;
      return 0;
    });
    return participants;
  }
}
