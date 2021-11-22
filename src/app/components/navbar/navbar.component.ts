import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from "../../services/session.service";
<<<<<<< HEAD
import { MatFormFieldModule} from "@angular/material/form-field";
=======
>>>>>>> parent of 8957698 (Merge branch 'feature/internationalization' into develop)

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
    this.isLoggedIn = this.sessionService.getIsLoggedIn();
    this.user = this.sessionService.getCurrentSession().user.id.toString();
    console.log(this.isLoggedIn);
    console.log(this.user);
  }

  logout() {
    this.sessionService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }
}
