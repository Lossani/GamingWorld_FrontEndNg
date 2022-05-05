import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GamingWorld-FrontEnd';

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    const browseLang = translate.getBrowserLang();
    translate.use(browseLang?.match(/en_US|es_ES/) ? browseLang: 'en');
  }
}
