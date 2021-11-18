import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Game } from 'src/app/entities/game-entity';
import { GameService } from 'src/app/services/game.service';
import {TournamentService} from "../../services/tournament.service";
import {Tournament} from "../../entities/tournament-entity";
import {MatDialog} from "@angular/material/dialog";


import {ConfirmSigninTournamentComponent} from "../../components/dialogs/confirm-signin-tournament/confirm-signin-tournament.component";

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css']
})
export class TournamentPageComponent implements OnInit {

  games!: Game[];
  tournaments!: Tournament[];
  filterTournaments!: Tournament[];
  tournament!: Tournament;
  submitted: boolean = false;
  panelOpenState: boolean = false;


  registerForm: FormGroup =  this.formBuilder.group({
    title: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    description: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    urlToImage: ['', {updateOn: 'change'} ],
    game: ['', {updateOn: 'change'}],
    isTeam: [false, {updateOn: 'change'}],
    date: ['', {validators: [Validators.required], updateOn: 'change'}],
    teamTournament: this.formBuilder.group({
      teamQuantity: ['', {updateOn: 'change'}],
    }),
    soloTournament: this.formBuilder.group({
      playerCapacity: ['', {updateOn: 'change'}],
    })
  });

  constructor(private gameService: GameService, private tournamentService: TournamentService, public dialog: MatDialog, public formBuilder: FormBuilder) {
    gameService.getGames().subscribe(data => {
      this.games = data;
    });

    tournamentService.getTournaments().subscribe(data => {

      this.tournaments = this.sortTournaments(data);
      this.filterTournaments = this.tournaments;

    });
    this.tournament = {} as Tournament;
  }

  // Properties
  get title() { return this.registerForm.get('title');}

  get urlToImage() { return this.registerForm.get('urlToImage'); }

  get summary() { return this.registerForm.get('description'); }

  get content() { return this.registerForm.get('content'); }

  submitForm() {
    let postedAt: Date = new Date();
    console.log(this.registerForm.valid);
    let tq = this.registerForm.controls.teamTournament as FormGroup;
    let pc = this.registerForm.controls.soloTournament as FormGroup;

    this.submitted = true;
    this.tournament.userId = 1;
    this.tournament.gameId = this.registerForm.controls.game.value;
    this.tournament.title = this.registerForm.controls.title.value;
    this.tournament.description = this.registerForm.controls.description.value;
    this.tournament.urlToImage = this.registerForm.controls.urlToImage.value.toString();
    console.log(this.registerForm.controls.urlToImage.value.toString());
    this.tournament.tournamentCapacity = this.registerForm.controls.isTeam.value ? tq.controls.teamQuantity.value : pc.controls.playerCapacity.value;
    let tDate: Date = new Date(this.registerForm.controls.date.value);
    this.tournament.tournamentDate = this.registerForm.controls.date.value;
    console.log(tDate.toString());
    // this.tournament.tDate = tDate.getFullYear()+'-'+(tDate.getMonth()+1)+'-'+tDate.getDate();
    // this.tournament.tHour = tDate.getHours() + ":" + tDate.getMinutes();
    this.tournament.tournamentStatus = true;
    this.tournament.createdAt = postedAt.toISOString();
    this.tournament.prizePool = 0;
    this.tournament.isTeamMode = this.registerForm.controls.isTeam.value;


    this.addTournament();
    this.cancelButton();
  }

  addTournament() {
    let date: Date = new Date();
    this.tournamentService.postTournament(this.tournament).subscribe((response: any) => {
      this.tournament.id= response.id;
      this.filterTournaments.push(this.tournament);
      this.filterTournaments = this.sortTournaments(this.filterTournaments);
    });
  }

  isValidUrl(url: string){
    var reg = new RegExp("(https|http)?://(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%+.~#?&//=]*)", "i");
    return reg.test(url);

  }

  sortTournaments(tournaments: Tournament[]){
    tournaments.sort( (a,b) => {
        if (new Date(a.createdAt) > new Date(b.createdAt))
          return -1;
        if (new Date(a.createdAt) < new Date(b.createdAt))
          return 1;
        return 0;
    });
    return tournaments;
  }




  ngOnInit(): void {

  }



  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }
  clearForm() {
    this.registerForm.reset();
    for (let control in this.registerForm.controls) {
      this.registerForm.controls[control].setErrors(null);
    }
  }
  cancelButton()
  {
    this.clearForm();
    this.togglePanel();
  }

  findTournaments(isTeam: boolean){
    this.filterTournaments = this.tournaments.filter( ({isTeamMode}) => (isTeam ? isTeamMode : !isTeamMode) )
    this.filterTournaments = this.sortTournaments(this.filterTournaments);
  }

  openConfirmRegistration() {
    const dialogRef = this.dialog.open(ConfirmSigninTournamentComponent, {
      data: {
        title: this.tournament?.title
      }
    });

  }

  compareDates(tournament: any){
    let date1: Date = new Date();
    let comp: number = 0;
    let tDate = new Date(tournament.tournamentDate);
    return (date1 < tDate);
  }

}
