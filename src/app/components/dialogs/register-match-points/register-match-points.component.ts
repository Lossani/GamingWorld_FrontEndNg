import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {map, startWith} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TournamentService} from "../../../services/tournament.service";


@Component({
  selector: 'app-register-match-points',
  templateUrl: './register-match-points.component.html',
  styleUrls: ['./register-match-points.component.css']
})
export class RegisterMatchPointsComponent implements OnInit {
  myControl = new FormControl();
  participantControl: FormGroup = this.formBuilder.group({
    points: ['', {validators: [Validators.min(0), Validators.required], updateOn: 'change'}],
    }
  )
  filteredOptions: Observable<any[]> = new Observable<Array<string>>();
  participants: any[];
  searchParticipant: any = null;
  extraPoints: any = 0;
  participantsMatchPoints: any[] = [];
  tournamentId: number = 0;
  tournamentType: string = "";



  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private tournamentService: TournamentService, public formBuilder: FormBuilder) {
    this.participants = dialogData.participants;
    this.tournamentId = dialogData.tournamentId;
    tournamentService.getTournamentById(this.tournamentId).subscribe(
      data =>{
        if(data!=null){
          this.tournamentType = data.isTeamMode ? "Team" : "Participant";
        }
      }
    )
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {if(value!=null) return (typeof value === 'string' ? value : value.name)}),
      map(name => (name ? this._filter(name) : this.participants.slice())),
    );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.participants.filter(option => option.name.toLowerCase().includes(filterValue));
  }

   addParticipant(){

       let temp = {...this.searchParticipant}
       temp.points = 0;
       if (!this.participantsMatchPoints.some(e => e.id === temp.id)) {
         temp.points = parseInt(temp.points) + parseInt(this.extraPoints);
         this.participantsMatchPoints.push(temp);
       }
       this.myControl.reset();
       this.extraPoints = 0;
       this.searchParticipant = null;
   }

   addParticipantPoints() {
     this.participants.forEach((value) => {
       this.participantsMatchPoints.forEach((value2) => {
         if (value.id == value2.id) {
           value.points += value2.points;
         }
       })
      this.tournamentService.updateTournamentPoints(this.tournamentId,this.tournamentType,value.id,value.points).subscribe(value=>{console.log(value)});
     })
     this.searchParticipant = null;
     this.extraPoints = 0;
     this.participantsMatchPoints = [];
   }

  onOptionSelected(dataOption: any) {
    this.searchParticipant = dataOption.option.value;
  }

  public getDisplayFn(val:any) {
    if(val!=null)
    return val.name;
  }

  updateBox(e:any) {
    this.extraPoints = e.target.value;
  }

  deleteParticipant(pos:any){
    this.participantsMatchPoints=this.participantsMatchPoints.filter(function(value){
      return value.id !== pos.id;
    });

  }



}
