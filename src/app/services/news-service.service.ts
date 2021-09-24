import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { article, source, topHeadlines } from '../entities/news-entity';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private URL = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=ba7a180f03ee4e3b9594cbeec69ce73c"

  constructor(private http: HttpClient) { }

  getTopNews(): Observable<topHeadlines> {
    return this.http.get<topHeadlines>(this.URL);
  }
}
