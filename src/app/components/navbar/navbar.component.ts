import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from "../../services/session.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user?: string;
  isLoggedIn?: Boolean;

  @Input()
  public isInNews: boolean = false;

  searchQuery = new FormControl('');


  constructor(public router: Router, private sessionService: SessionService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = SessionService.getIsLoggedIn();
    this.user = SessionService.getCurrentSession().user.id.toString();
    console.log(this.isLoggedIn);
    console.log(this.user);
  }

  logout() {
    SessionService.logout();
    this.isLoggedIn = false;
  }
}
