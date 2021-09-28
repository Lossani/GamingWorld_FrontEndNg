import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameExperience, User, UserGame } from '../entities/user-entity';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileUrl = "http://localhost:3000/usuarios/";

  constructor(private Http: HttpClient) { }

  getProfileById(id: number): Observable<User>{
    const url = this.profileUrl + id.toString() + "?_embed=competencias&_embed=game-experiences"
    return this.Http.get<User>(url);
  }

  getExperiencedGames(id: number): Observable<UserGame[]> {
    const url = `http://localhost:3000/game-experiences?usuarioId=${id}&_expand=game`;
    return this.Http.get<UserGame[]>(url);
  }

  postGameExperience(gameExperience: GameExperience): Observable<GameExperience> {
    const url = `http://localhost:3000/game-experiences`;
    return this.Http.post<GameExperience>(url, {
      experienceLevel: gameExperience.experienceLevel,
      gameId: gameExperience.gameId,
      usuarioId: gameExperience.usuarioId
    });
  }

  putGameExperience(element: UserGame, usuarioId: number): Observable<UserGame> {
    const url = `http://localhost:3000/game-experiences/${element.id}`;
    return this.Http.put<UserGame>(url, {
      experienceLevel: element.experienceFormController.value,
      gameId: element.game.id,
      usuarioId: usuarioId
    });
  }

  deleteGameExperience(id: number): Observable<any>{
    console.log("delete");
    const url = `http://localhost:3000/game-experiences/${id}`;
    return this.Http.delete(url);
  }
}
