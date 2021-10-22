import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Game } from 'src/app/entities/game-entity';
import { GameService } from 'src/app/services/game.service';
import {TournamentService} from "../../services/tournament.service";
import {Tournament} from "../../entities/tournament-entity";
import {MatDialog} from "@angular/material/dialog";
import {PremiumInformationDialogComponent} from "../../components/dialogs/premium-information-dialog/premium-information-dialog.component";
import {formatDate} from "@angular/common";

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
    urlToImage: ['', {updateOn: 'change'}],
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
      console.log(this.games)
    });

    tournamentService.getTournaments().subscribe(data => {
      this.tournaments = data;
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

    this.submitted = true;
    this.tournament.userId = 1;
    this.tournament.title = this.registerForm.controls.title.value;
    this.tournament.description = this.registerForm.controls.description.value;
    this.tournament.urlToImage = this.registerForm.controls.urlToImage.value;
    this.tournament.teamQuantity = this.registerForm.controls.isTeam.value ? (this.registerForm.controls).teamTournament.value.teamQuantity.value : null;
    this.tournament.playerCapacity = this.registerForm.controls.isTeam.value ? (this.registerForm.controls).soloTournament.value.playerCapacity.value : null;
    this.tournament.teamTournament = this.registerForm.controls.isTeam.value;
    let tDate: Date = new Date(this.registerForm.controls.date.value);
    this.tournament.tDate = tDate.getFullYear()+'-'+(tDate.getMonth()+1)+'-'+tDate.getDate();;
    this.tournament.tHour = tDate.getHours() + ":" + tDate.getMinutes();

    this.tournament.postedAt = postedAt.toISOString();

    this.addUrgency();
  }

  addUrgency() {
    let date: Date = new Date();
    this.tournamentService.postTournament(this.tournament).subscribe((response: any) => {
    });
  }

  ngOnInit(): void {

  }

  openPremiumInfoDialog(): void{
    const dialogRef = this.dialog.open(PremiumInformationDialogComponent);
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  findTournaments(isTeam: boolean){
    this.filterTournaments = this.tournaments.filter( ({teamTournament}) => (isTeam ? teamTournament : !teamTournament) )
  }

}
