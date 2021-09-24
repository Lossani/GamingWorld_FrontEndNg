import { Component, OnInit } from '@angular/core';
import { topHeadlines } from 'src/app/entities/news-entity';
import { NewsService } from 'src/app/services/news-service.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  headlinesLoaded: boolean = false;
  TopHeadlines!: topHeadlines;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getTopNews()
      .subscribe(topHeadline => {
        let articles = topHeadline.articles
          .filter(({urlToImage, description}) => (urlToImage && description));
        this.TopHeadlines = topHeadline;
        this.TopHeadlines.articles = articles;
        this.headlinesLoaded = true;
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

}
