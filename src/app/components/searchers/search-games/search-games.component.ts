import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {GameService} from "../../../services/game.service";
import {Game} from "../../../entities/game-entity";
import {RequireMatch} from "../validators/required-match";

@Component({
  selector: 'app-search-games',
  templateUrl: './search-games.component.html',
  styleUrls: ['./search-games.component.css'],

})
export class SearchGamesComponent implements OnInit {

  myControl = new FormControl();
  options: any[] = [];

  @Input() selectedGame: any = {};
  @Input() resetFormSubject: boolean = false;

  constructor(private gameService: GameService) {
    this.myControl.setValidators([Validators.required, RequireMatch])
    this.myControl.updateValueAndValidity();
  }

  ngOnInit() {
  }

  ngDoCheck() {
    if(this.resetFormSubject){
      this.myControl.reset();
      this.resetFormSubject = !this.resetFormSubject
      this.options = []
    }
  }

  onOptionSelected(dataOption: any) {
    this.selectedGame=dataOption.option.value
    console.log(dataOption.option.value);
    this.sendMessage();
    //set you model here so that your input box get selected value
  }

  @Output() messageEvent = new EventEmitter<string>();
  sendMessage() {
    this.messageEvent.emit(this.selectedGame)
  }



  public getDisplayFn(val:any) {
    if(val!=null)
      return val.name;
  }

  updateBox(e:any) {
    if(e.target.value.length){
      this.gameService.getGamesByName(e.target.value).subscribe(
        data =>{
          if(data.length>0)
          this.options = data;
          else this.options = [];
        }
      )
    }
  }

}
