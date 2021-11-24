import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionService} from "../../services/session.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user?: string;
  isLoggedIn?: Boolean;
  selectedLang: string | null;

  @Input()
  public isInNews: boolean = false;

  searchQuery = new FormControl('');

  constructor(public router: Router, private sessionService: SessionService, public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    const browseLang = translate.getBrowserLang();

    this.selectedLang = localStorage.getItem("SELECTED_LANG");

    if (this.selectedLang != null && this.selectedLang != "" && (this.selectedLang == "en" ||this.selectedLang == "es"))
      translate.use(this.selectedLang);
    else
      translate.use(browseLang?.match(/en_US|es_ES/) ? browseLang : 'en');
  }

  ngOnInit(): void {
    this.isLoggedIn = this.sessionService.getIsLoggedIn();
    this.user = this.sessionService.getCurrentSession().user.id.toString();
  }

  logout() {
    this.sessionService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }

  changeLang(lang: string)
  {
    localStorage.setItem("SELECTED_LANG", lang);
    this.translate.use(lang);
  }
}
