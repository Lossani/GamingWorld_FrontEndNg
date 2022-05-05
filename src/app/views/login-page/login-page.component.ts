import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../entities/user-entity";
import {Router} from "@angular/router";
import {SessionService} from "../../services/session.service";

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

  constructor( private sessionService: SessionService, public formBuilder: FormBuilder,private router: Router ) {
    this.user = {} as User;
  }

 async login() {
    this.user.username = this.loginForm.controls.username.value;
    this.user.password = this.loginForm.controls.password.value;
    this.sessionService.attemptLogin(this.user).then(
      success => {
        if (success)
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          });
      }
    ).catch(() => {
        alert("Wrong login details.");
    });
  }



  ngOnInit(): void {
  }

}
