import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from 'src/app/services/game.service';
import {TournamentService} from "../../services/tournament.service";
import {Tournament} from "../../entities/tournament-entity";
import {MatDialog} from "@angular/material/dialog";


import {ConfirmSigninTournamentComponent} from "../../components/dialogs/confirm-signin-tournament/confirm-signin-tournament.component";
import {Subject} from "rxjs";
import {SessionService} from "../../services/session.service";
import {User} from "../../entities/user-entity";
import {ProfileService} from "../../services/profile.service";


@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css']
})
export class TournamentPageComponent implements OnInit {

  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  tournaments!: Tournament[];
  filterTournaments!: Tournament[];
  tournament!: Tournament;
  submitted: boolean = false;
  panelOpenState: boolean = false;
  selectedGame: any = {};
  resetSearchGame: boolean = false;

  sessionValid: boolean = false;

  registerForm: FormGroup =  this.formBuilder.group({
    title: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    description: ['', {validators: [Validators.required, Validators.minLength(30)], updateOn: 'change'}],
    urlToImage: ['', {updateOn: 'change'} ],
    prizePool: ['0', {validators: [Validators.min(0)], updateOn: 'change'}],
    // game: ['', {validators: [Validators.required, RequireMatch], updateOn: 'change'}],
    isTeam: [false, {updateOn: 'change'}],
    date: ['', {validators: [Validators.required, ], updateOn: 'change'}],
    // teamTournament: this.formBuilder.group({
    //   teamQuantity: ['',{validators: [Validators.required], updateOn: 'change'}],
    // }),
    // soloTournament: this.formBuilder.group({
    //   playerCapacity: ['',{validators: [Validators.required], updateOn: 'change'}],
    // })
    tournamentCapacity: ['', {validators: [Validators.min(2), Validators.required], updateOn: 'change'}],
  });

  constructor(private profileService: ProfileService,private gameService: GameService, private tournamentService: TournamentService,
              public dialog: MatDialog, public formBuilder: FormBuilder, private sessionService: SessionService) {
    // gameService.getGames().subscribe(data => {
    //   this.games = data;
    // });

    this.sessionValid = this.sessionService.getIsLoggedIn()

    tournamentService.getTournaments().subscribe(data => {

      this.tournaments = this.sortTournaments(data);

      let participantId: any;
      profileService.getProfileByUserId(this.sessionService.getCurrentSession().user.id).subscribe(
        data=>{
          participantId = data.id;
          this.tournaments.forEach(element=> {this.tournamentService.validateUserInTournament(element.id, participantId).subscribe(value => {
            element.inTournament = !value;
          })
          });
        }
      )



      this.filterTournaments = this.tournaments;

    });
    this.tournament = {} as Tournament;
  }

  // Properties
  get title() { return this.registerForm.get('title');}

  get urlToImage() { return this.registerForm.get('urlToImage'); }

  get summary() { return this.registerForm.get('description'); }

  get content() { return this.registerForm.get('content'); }

  resetChildForm(){
    this.resetFormSubject.next(true);
  }

  date() {
    let nowDate = new Date();
    var userTimezoneOffset = nowDate.getTimezoneOffset() * 60000;
    nowDate = new Date(nowDate.getTime()-userTimezoneOffset);
    nowDate.setDate(nowDate.getDate()+1)
    return nowDate.toISOString().slice(0,16);
  }

  receiveMessage($event:any) {
    // this.registerForm.controls.game = $event;
    if($event!=[]){
      this.selectedGame = $event
    }
  }

  submitForm() {
    let postedAt: Date = new Date();

    this.submitted = true;
    this.tournament.userId = this.sessionService.getCurrentSession().user.id;
    this.tournament.title = this.registerForm.controls.title.value;
    this.tournament.description = this.registerForm.controls.description.value;
    if(this.registerForm.controls.urlToImage.value != null)
    this.tournament.urlToImage = this.registerForm.controls.urlToImage.value.toString();
    this.tournament.prizePool = this.registerForm.controls.prizePool.value;
    this.tournament.tournamentCapacity = this.registerForm.controls.tournamentCapacity.value;
    let tDate: Date = new Date(this.registerForm.controls.date.value);
    this.tournament.tournamentDate = (new Date(tDate.getTime()));
    this.tournament.gameId = this.selectedGame.id;
    this.tournament.tournamentStatus = true;
    this.tournament.createdAt = postedAt.toISOString();
    this.tournament.isTeamMode = this.registerForm.controls.isTeam.value;

    this.selectedGame = {};
    this.addTournament();
    this.cancelButton();
  }

  addTournament() {
    this.tournamentService.postTournament(this.tournament).subscribe((response: any) => {
      this.tournament.id= response.id;
      this.tournaments.push(this.tournament);
      this.tournament = {} as Tournament;
      this.tournaments = this.sortTournaments(this.tournaments);
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

    if(this.panelOpenState && this.resetSearchGame)
    this.resetSearchGame = false;

  }
  clearForm() {
    for (let control in this.registerForm.controls) {
      this.registerForm.controls[control].setErrors(null);
    }
    this.registerForm.reset();
  }
  cancelButton()
  {

    this.selectedGame = {};
    this.resetSearchGame = true;

    this.clearForm();
    this.togglePanel();
  }

  findTournaments(isTeam: boolean){
    this.filterTournaments = this.tournaments.filter( ({isTeamMode}) => (isTeam ? isTeamMode : !isTeamMode) )
    this.filterTournaments = this.sortTournaments(this.filterTournaments);
  }

  openConfirmRegistration(tournament: Tournament) {
    const dialogRef = this.dialog.open(ConfirmSigninTournamentComponent, {
      data: {
        title: this.tournament?.title
      }
    }).afterClosed().subscribe((result: boolean) =>{

      let user: User = this.sessionService.getCurrentSession().user;
      let profile: any;
      this.profileService.getProfileByUserId(user.id).subscribe(data=>{
        profile=data;

        if(result){this.tournamentService.registerInTournament(tournament.id, profile.id).subscribe(data => {
          tournament.inTournament=data;
        });}
      })


    });


  }
  compareDates(tournament: any){
    let date1: Date = new Date();
    let tDate = new Date(tournament.tournamentDate);
    return (date1 < tDate);
  }

}
