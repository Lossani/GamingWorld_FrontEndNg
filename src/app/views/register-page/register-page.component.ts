import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import {UsersService} from "../../services/users.service";
import {User} from "../../entities/user-entity";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  user: User = {} as User;
  submitted: boolean = false;


  registerForm: FormGroup =  this.formBuilder.group({
    username: ['', {validators: [Validators.required, Validators.maxLength(30)], updateOn: 'change'}],
    password: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    confirmPassword: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    name: ['', {validators: [Validators.required, Validators.maxLength(40)], updateOn: 'change'}],
    lastName: ['', {validators: [Validators.required, Validators.maxLength(40)], updateOn: 'change'}],
    email: ['', {validators: [Validators.required], updateOn: 'change'}]

  }, { validator: this.checkPasswords });

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(private usersService: UsersService, public formBuilder: FormBuilder) {


  }


  ngOnInit(): void {
  }

  submitForm() {

    console.log(this.registerForm.valid);
    this.submitted = true;
    this.user.username = this.registerForm.controls.username.value;
    this.user.name = this.registerForm.controls.name.value;
    this.user.lastName = this.registerForm.controls.lastName.value;
    this.user.email = this.registerForm.controls.email.value;
    this.user.password = this.registerForm.controls.password.value;
    this.user.role="USER";
    this.user.premium=false;

    this.addUser();
    this.cancelButton();
  }

  addUser() {
    this.usersService.postUser(this.user).subscribe((response: any) => {
      console.log(response);
    });
  }

  clearForm() {
    for (let control in this.registerForm.controls) {
      this.registerForm.controls[control].setErrors(null);
    }
    this.registerForm.reset();
  }



  cancelButton()
  {
    this.clearForm();

  }


}
