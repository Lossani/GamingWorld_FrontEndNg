import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../entities/game-entity';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  URL = "https://json-test-server.herokuapp.com/games";

  constructor(private Http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.Http.get<Game[]>(this.URL);
  }
}
