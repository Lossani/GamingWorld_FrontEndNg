import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm-user-registration',
  templateUrl: './confirm-user-registration.component.html',
  styleUrls: ['./confirm-user-registration.component.css']
})
export class ConfirmUserRegistrationComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
