import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import { Tournament } from '../entities/tournament-entity';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private baseURL = "http://localhost:3000/tournaments";

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
    return this.http.post<Tournament>(this.baseURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
