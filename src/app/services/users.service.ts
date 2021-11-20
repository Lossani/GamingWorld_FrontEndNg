import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Tournament} from "../entities/tournament-entity";
import {catchError, map, retry} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {User} from "../entities/user-entity";
import {ServiceConfiguration} from "./service-configuration";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL = "";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response' as 'body'
  }

  constructor(private http: HttpClient, serviceConfiguration: ServiceConfiguration) {
    this.baseURL = serviceConfiguration.baseUrl;
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

  postLogin(item: any):Observable<any> {
    return this.http.post<any>(`${this.baseURL}/login`, JSON.stringify(item), this.httpOptions);
  }

  getUserByEmail(email: string, token: string){

    let params = new URLSearchParams();
    params.append('email', email);

    let tempHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      }),
      search: params
    }
    return this.http.get<User>(`${this.baseURL}/api/v1/users`, tempHttpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }



}
