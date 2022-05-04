import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ListOfArticles, topHeadlines} from '../entities/news-entity';
import {TopGames} from '../entities/twitch-global-stats.entity';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private NEWS_URL = "https://api.gworld.xempre.com/api/v1/";

  constructor(private http: HttpClient) { }

  getTopNews(): Observable<topHeadlines> {
    return this.http.get<topHeadlines>(`${this.NEWS_URL}/news?theme=Gaming`);
  }

  getQuery(value: string): Observable<ListOfArticles> {
    return this.http.get<ListOfArticles>(`${this.NEWS_URL}/news?theme=${value}`);
  }

  getTwitchTopGames(): Observable<TopGames> {
    return this.http.get<TopGames>(`${this.NEWS_URL}/games/top?limit=5`);
  }
}
