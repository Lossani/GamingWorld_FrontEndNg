import { Component, OnInit } from '@angular/core';
import { topHeadlines } from 'src/app/entities/news-entity';
import { NewsService } from 'src/app/services/news.service';
import {MatDialog} from "@angular/material/dialog";
import {PremiumInformationDialogComponent} from "../../components/dialogs/premium-information-dialog/premium-information-dialog.component";
import { TopGames } from 'src/app/entities/twitch-global-stats.entity';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  headlinesLoaded: boolean = false;
  TopHeadlines!: topHeadlines;
  TopGames!: TopGames;

  constructor(private newsService: NewsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    sessionStorage.setItem("user", "1");
    this.newsService.getTopNews()
      .subscribe(topHeadline => {
        let articles = topHeadline.articles
          .filter(({urlToImage, description}) => (urlToImage && description));
        this.TopHeadlines = topHeadline;
        this.TopHeadlines.articles = articles;
        this.headlinesLoaded = true;
      });
    this.newsService.getTwitchTopGames()
      .subscribe(topGames => {
        this.TopGames = topGames;
        console.log(this.TopGames);
      });
  }

  findNews(theme: string): void{
    this.headlinesLoaded = false;
    this.newsService.getQuery(theme)
      .subscribe(Articles => {
        console.log(Articles);
        let articles = Articles.articles
          .filter(({urlToImage, description}) => (urlToImage && description));
        this.TopHeadlines = Articles;
        this.TopHeadlines.articles = articles;
        this.headlinesLoaded = true;
      });
  }

  scrollToTheTop(): void{
    window.scroll(0,0);
  }

  openPremiumInfoDialog(): void{
    const dialogRef = this.dialog.open(PremiumInformationDialogComponent);
  }

}
