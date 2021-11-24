import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from "../../services/session.service";
import {TranslateService} from "@ngx-translate/core";

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

  constructor(public router: Router, private sessionService: SessionService, public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    const browseLang = translate.getBrowserLang();
    translate.use(browseLang?.match(/en_US|es_ES/) ? browseLang: 'en');
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
