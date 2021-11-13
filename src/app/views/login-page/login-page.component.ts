import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../entities/user-entity";
import {UsersService} from "../../services/users.service";
import {Tournament} from "../../entities/tournament-entity";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup =  this.formBuilder.group({
    username: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    password: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
  });

  user!:User

  login() {
    this.user.username = this.loginForm.controls.username.value;
    this.user.password = this.loginForm.controls.password.value;
    console.log(this.user)
    this.usersService.postLogin(this.user).subscribe( (response)=>{
      console.log(response.headers)
      }

    );
  }

  constructor( private usersService: UsersService, public formBuilder: FormBuilder ) {
    this.user = {} as User;
  }

  ngOnInit(): void {
  }

}
