import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Competencia, GameExperience, Team, User, UserCompetencia, UserGame} from '../entities/user-entity';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileUrl = "https://json-test-server.herokuapp.com/usuarios/";
  private URL = "https://json-test-server.herokuapp.com";

  constructor(private Http: HttpClient) { }

  getProfileById(id: number): Observable<User>{
    const url = this.profileUrl + id.toString() + "?_embed=competencias&_embed=game-experiences"
    return this.Http.get<User>(url);
  }

  getExperiencedGames(id: number): Observable<UserGame[]> {
    const url = `${this.URL}/game-experiences?usuarioId=${id}&_expand=game`;
    return this.Http.get<UserGame[]>(url);
  }

  postGameExperience(gameExperience: GameExperience): Observable<GameExperience> {
    const url = `${this.URL}/game-experiences`;
    return this.Http.post<GameExperience>(url, {
      experienceLevel: gameExperience.experienceLevel,
      gameId: gameExperience.gameId,
      usuarioId: gameExperience.usuarioId
    });
  }

  putGameExperience(element: UserGame, usuarioId: number): Observable<UserGame> {
    const url = `${this.URL}/game-experiences/${element.id}`;
    return this.Http.put<UserGame>(url, {
      experienceLevel: element.experienceFormController.value,
      gameId: element.game.id,
      usuarioId: usuarioId
    });
  }

  putTournament(element: Competencia, usuarioId: number): Observable<Competencia> {
    const url = `${this.URL}/competencias/${element.id}`;
    return this.Http.put<Competencia>(url, {
      userId: usuarioId,
      nombre: element.nombreFormController.value,
      date: element.date,
      puesto: element.puestoFormController.value
    });
  }


  deleteGameExperience(id: number): Observable<any>{
    const url = `${this.URL}/game-experiences/${id}`;
    return this.Http.delete(url);
  }

  getTournaments(userId: number): Observable<Competencia[]> {
    const url = `${this.URL}/competencias?usuarioId=${userId}`;
    return this.Http.get<Competencia[]>(url);
  }

  postTournament(tournament: UserCompetencia, userId: number): Observable<Competencia> {
    const url = `${this.URL}/competencias`;
    return this.Http.post<Competencia>(url, {
      usuarioId: userId,
      nombre: tournament.nombre,
      date: tournament.date,
      puesto: tournament.puesto
    });
  }

  deleteTournament(id: number): Observable<any>{
    console.log("delete");
    const url = `${this.URL}/competencias/${id}`;
    return this.Http.delete(url);
  }

  // TEAMS

  getTeams(userId: number): Observable<Team[]>
  {
    const url = `${this.URL}/teams?usuarioId=${userId}`;
    return this.Http.get<Team[]>(url);
  }

  postTeam(team: Team, userId: number): Observable<Team>
  {
    const url = `${this.URL}/teams`;
    return this.Http.post<Team>(url, {
      usuarioId: userId,
      nombre: team.nombre,
      numeroMiembros: team.numeroMiembros
    });
  }

  deleteTeam(id: number | undefined): Observable<any>{
    const url = `${this.URL}/teams/${id}`;
    return this.Http.delete(url);
  }

}

