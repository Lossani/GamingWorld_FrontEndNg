import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { Game } from '../entities/game-entity';
import {ServiceConfiguration} from "./service-configuration";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  URL = "";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
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

  constructor(private Http: HttpClient,serviceConfiguration: ServiceConfiguration) {
    this.URL = serviceConfiguration.baseUrl + "/api/v1/games";
  }

  getGames(): Observable<Game[]> {
    return this.Http.get<Game[]>(this.URL);
  }

  getGamesByName(text: string): Observable<Game[]>{
    return this.Http.get<Game[]>(`${this.URL}/find?name=${text}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getGameById(id: number): Observable<Game>{
      return this.Http.get<Game>(`${this.URL}/${id}`, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError));
  }

}
