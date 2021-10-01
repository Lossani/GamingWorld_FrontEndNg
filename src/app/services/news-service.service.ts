import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { article, ListOfArticles, source, topHeadlines } from '../entities/news-entity';
import { TopGames } from '../entities/twitch-global-stats.entity';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private TwitchURL = "https://aos-twitch-api.herokuapp.com/";

  constructor(private http: HttpClient) { }

  getTopNews(): Observable<topHeadlines> {
    return this.http.get<topHeadlines>(`${this.TwitchURL}news/top-headlines`);
  }

  getQuery(value: string): Observable<ListOfArticles> {
    return this.http.get<ListOfArticles>(`${this.TwitchURL}news/find?=${value}`);
  }

  getTwitchTopGames(): Observable<TopGames> {
    return this.http.get<TopGames>(this.TwitchURL + "twitch/top-games");
  }
}
