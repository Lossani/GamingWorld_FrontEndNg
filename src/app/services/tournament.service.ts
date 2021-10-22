import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tournament } from '../entities/tournament-entity';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private baseURL = "http://localhost:3000";

  constructor(private http: HttpClient) { }


  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.baseURL}/tournaments`);
  }
}
