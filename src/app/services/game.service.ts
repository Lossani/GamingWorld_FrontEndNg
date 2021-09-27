import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../entities/game-entity';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  URL = "http://localhost:3000/games";

  constructor(private Http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.Http.get<Game[]>(this.URL);
  }
}
