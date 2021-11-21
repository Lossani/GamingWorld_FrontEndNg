import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../entities/user-entity";
import {UsersService} from "../../services/users.service";
import {Tournament} from "../../entities/tournament-entity";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {SessionService} from "../../services/session.service";
import {TranslateService} from "@ngx-translate/core";

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

  constructor( private sessionService: SessionService, public formBuilder: FormBuilder,private router: Router, public translate: TranslateService ) {
    this.user = {} as User;

    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en_US|es_ES/) ? browserLang : 'en')
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
    );
  }



  ngOnInit(): void {
  }

}
