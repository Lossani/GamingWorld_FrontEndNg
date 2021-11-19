import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import {Session} from "../entities/session-entity";
import {UsersService} from "./users.service";
import {emit} from "cluster";

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  private localStorageService;
  private static currentSession : Session = {} as Session;

  constructor(private router: Router, private usersService: UsersService) {

    this.localStorageService = localStorage;
  }

  createSession(token: string, email: string){
    this.usersService.getUserByEmail(email, token).subscribe(
      response => {
        SessionService.currentSession.user = response;
        SessionService.currentSession.token = token;
      }
    )
  }

}
