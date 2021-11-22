import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {GameService} from "../../../services/game.service";
import {RequireMatch} from "../validators/required-match";
import {UsersService} from "../../../services/users.service";
import {MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";


@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  myControl = new FormControl();
  options: any[] = [];

  selectedGame: any = {};
  // @Input() resetFormSubject: boolean = false;

  constructor(private gameService: GameService, private usersService: UsersService, private router: Router) {
    this.myControl.setValidators([Validators.required, RequireMatch])
    this.myControl.updateValueAndValidity();
  }

  ngOnInit() {
  }

  ngDoCheck() {
    // if(this.resetFormSubject){
    //   this.myControl.reset();
    //   this.resetFormSubject = !this.resetFormSubject
    //   this.options = []
    // }
  }

  onOptionSelected(dataOption: any) {
    this.selectedGame=dataOption.option.value
    console.log(dataOption.option.value.id);
    this.router.navigateByUrl('/profile/'+dataOption.option.value.id).then(() => {
      window.location.reload();
    });
    // this.sendMessage();
    //set you model here so that your input box get selected value
  }

  // @Output() messageEvent = new EventEmitter<string>();
  // sendMessage() {
  //   this.messageEvent.emit(this.selectedGame)
  // }


  public getDisplayFn(val:any) {
    if(val!=null)
      return val.username;
  }

  updateBox(e:any) {
    if(e.target.value.length){
      this.usersService.getUsersByUsername(e.target.value).subscribe(
        data =>{
          if(data.length>0)
            this.options = data;
          else this.options = [];
        }
      )
    }
  }

}
