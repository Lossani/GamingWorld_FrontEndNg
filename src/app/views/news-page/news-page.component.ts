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

}
