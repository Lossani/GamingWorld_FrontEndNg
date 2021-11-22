import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
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

  constructor(private http: HttpClient, private serviceConfiguration: ServiceConfiguration) {
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
    return this.http.get<User>(`${this.baseURL}/users`, tempHttpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getUsersByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users/find?username=${username}`, this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  postUser(item: any): Observable<User> {

    return this.http.post<User>(`${this.baseURL}/users/signup`, JSON.stringify(item), this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }



}
