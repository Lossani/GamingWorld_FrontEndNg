import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { article, ListOfArticles, source, topHeadlines } from '../entities/news-entity';
import { TopGames } from '../entities/twitch-global-stats.entity';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private URL = "https://newsapi.org/v2/";
  private TwitchURL = "https://aos-twitch-api.herokuapp.com/";

  constructor(private http: HttpClient) { }

  getTopNews(): Observable<topHeadlines> {
    let query = "top-headlines?country=us&category=technology&apiKey=ba7a180f03ee4e3b9594cbeec69ce73c";
    return this.http.get<topHeadlines>(this.URL + query);
  }

  getQuery(value: string): Observable<ListOfArticles> {
    let query = `everything?q=${value}&language=en&apiKey=ba7a180f03ee4e3b9594cbeec69ce73c`;
    return this.http.get<ListOfArticles>(this.URL + query);
  }

  getTwitchTopGames(): Observable<TopGames> {
    return this.http.get<TopGames>(this.TwitchURL + "twitch/top-games");
  }
}
