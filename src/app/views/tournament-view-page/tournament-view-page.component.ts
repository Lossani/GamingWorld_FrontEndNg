import { Component, OnInit } from '@angular/core';
import {TournamentService} from "../../services/tournament.service";
import {Tournament} from "../../entities/tournament-entity";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmEndTournamentComponent} from "../../components/dialogs/confirm-end-tournament/confirm-end-tournament.component";
import {RegisterMatchPointsComponent} from "../../components/dialogs/register-match-points/register-match-points.component";
import {SessionService} from "../../services/session.service";



@Component({
  selector: 'app-tournament-view-page',
  templateUrl: './tournament-view-page.component.html',
  styleUrls: ['./tournament-view-page.component.css']
})
export class TournamentViewPageComponent implements OnInit {

  tournament: Tournament = {} as Tournament;
  tournamentId!: number;
  participants: any[] = [];
  userValid: boolean = false;


  constructor(private tournamentService: TournamentService, private route: ActivatedRoute, public dialog: MatDialog,
  private sessionService: SessionService) {
    this.route.params.subscribe(params => {
      this.tournamentId = params['id']
    });

  }

  ngOnInit(): void {

    this.tournamentService.getTournamentById(this.tournamentId).subscribe((data: any) => {
      console.log(this.tournamentId)
      this.tournament=data;
      console.log(this.tournament);
      console.log(data)
      this.userValid = this.sessionService.getCurrentSession().user.id == data.user.id;
      console.log(this.sessionService.getCurrentSession().user.id);
      console.log(this.tournament.userId);
    });

    this.tournamentService.getParticipantsByTournamentId(this.tournamentId).subscribe(
      data=> {
        data.forEach(value => {
          this.participants.push(
            {id: value.id, name: value.participantProfile.user.username, points: value.points}
          )
        })
        console.log(this.participants);
      }
    )

  }

  endTournament() {
    const dialogRef = this.dialog.open(ConfirmEndTournamentComponent, {
      data: {
        title: this.tournament.title
      }
    }).afterClosed().subscribe((result: boolean) =>{
      console.log(result);
      if(result){this.tournamentService.endTournament(this.tournamentId).subscribe(data => {
        this.tournament = data;
      });}
    })
  }

  registerPoints() {
    const dialogRef = this.dialog.open(RegisterMatchPointsComponent, {

      data: {
        title: this.tournament.title,
        participants:this.participants,
        tournamentId: this.tournamentId
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

  ngDoCheck(){

  }

}


