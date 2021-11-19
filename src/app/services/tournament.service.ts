import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import { Tournament } from '../entities/tournament-entity';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private baseURL = "http://localhost:8080/api/v1/tournaments";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) {
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
    return this.http.get<Tournament[]>(`${this.baseURL}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  postTournament(item: any): Observable<Tournament> {
    return this.http.post<Tournament>(`${this.baseURL}/1/create`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getParticipantsByTournamentId(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseURL}/${id}/participants`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  registerInTournament(idTournament:number): Observable<any>{
    let item : any = {
      participantProfileId: 1,
      points: 0
    }

    return this.http.post<any>(`${this.baseURL}/${idTournament}/participants`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  validateUserInTournament(idTournament:number, idParticipant: number): Observable<any>{
    return this.http.get<any>(`${this.baseURL}/${idTournament}/participants/${idParticipant}/validate`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  updatePointsTournament(idTournament:number, idParticipant: number, points: number): Observable<any>{
    return this.http.get<any>(`${this.baseURL}/${idTournament}/participants/${idParticipant}?points=${points}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  getTournamentById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.baseURL}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  endTournament(id: number): Observable<Tournament> {
    return this.http.put<Tournament>(`${this.baseURL}/${id}/end`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
