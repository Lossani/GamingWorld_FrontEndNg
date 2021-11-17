import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-register-match-points',
  templateUrl: './register-match-points.component.html',
  styleUrls: ['./register-match-points.component.css']
})
export class RegisterMatchPointsComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<any[]> | undefined;
  participants: any[];
  searchParticipant: any = null;
  extraPoints: any = 0;
  participantsMatchPoints: any[] = [];




  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.participants = dialogData.participants
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.participants.filter(option => option.name.toLowerCase().includes(filterValue));
  }

   addParticipant(){

       let temp = {...this.searchParticipant}

       temp.points = 0;

       console.log(this.extraPoints)

       if (!this.participantsMatchPoints.some(e => e.id === temp.id)) {
         temp.points = parseInt(temp.points) + parseInt(this.extraPoints);
         this.participantsMatchPoints.push(temp);
       }

       this.extraPoints = 0;
       console.log(temp);
       console.log(this.searchParticipant)

   }

   addParticipantPoints() {

     this.participants.forEach((value) => {
       this.participantsMatchPoints.forEach((value2) => {
         if (value.id == value2.id) {
           value.points += value2.points;
         }
       })
     })
     this.searchParticipant = null;
     this.extraPoints = 0;
       this.participantsMatchPoints = [];
   }

  onOptionSelected(dataOption: any) {
    this.searchParticipant=dataOption.option.value
    console.log(dataOption.option.value);
    //set you model here so that your input box get selected value
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
