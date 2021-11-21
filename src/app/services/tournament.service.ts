import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import { Tournament } from '../entities/tournament-entity';
import {ServiceConfiguration} from "./service-configuration";
import {ProfileService} from "./profile.service";
import {User} from "../entities/user-entity";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private baseURL = "";

  constructor(private http: HttpClient, private serviceConfiguration: ServiceConfiguration, private profileService: ProfileService, private sessionService: SessionService) {
    console.log(this.serviceConfiguration.httpOptions);
    this.baseURL = serviceConfiguration.baseUrl + "/tournaments";
    this.serviceConfiguration.httpOptions.headers.set('Authorization', "Bearer " + sessionService.getCurrentSession().token)
    console.log(this.serviceConfiguration.httpOptions);
  }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError('Something happened with request, please try again later');
  }

  getTournaments(): Observable<Tournament[]> {

    return this.http.get<Tournament[]>(`${this.baseURL}`, this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  postTournament(item: any): Observable<Tournament> {
    let user: User = this.sessionService.getCurrentSession().user;

    return this.http.post<Tournament>(`${this.baseURL}/${user.id}/create`, JSON.stringify(item), this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getParticipantsByTournamentId(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseURL}/${id}/participants`, this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  registerInTournament(idTournament:number, participantProfileId: number): Observable<any>{


    let item = {
      participantProfileId: participantProfileId,
      points: 0
    }



    return this.http.post<any>(`${this.baseURL}/${idTournament}/participants`, JSON.stringify(item), this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  validateUserInTournament(idTournament:number, idParticipant: number): Observable<any>{
    return this.http.get<any>(`${this.baseURL}/${idTournament}/participants/${idParticipant}/validate`, this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  updateTournamentPoints(idTournament:number,typeTournament:string, idParticipant: number, points: number): Observable<any>{
    return this.http.put<any>(`${this.baseURL}/${idTournament}/${typeTournament.toLowerCase()}s/${idParticipant}?points=${points}`, this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  getTournamentById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.baseURL}/${id}`, this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  endTournament(id: number): Observable<Tournament> {
    return this.http.put<Tournament>(`${this.baseURL}/${id}/end`, this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
