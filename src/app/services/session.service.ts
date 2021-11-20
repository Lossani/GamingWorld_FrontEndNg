import {Injectable, Optional, SkipSelf} from "@angular/core";
import {Router} from '@angular/router';
import {Session} from "../entities/session-entity";
import {UsersService} from "./users.service";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  private baseURL = "http://localhost:8080";

  private static currentSession : Session = {} as Session;

  private static isLoggedIn : Boolean = false;

  constructor(private router: Router, private usersService: UsersService, private http: HttpClient) {
    let sessionString = localStorage.getItem("currentSession");
    if (sessionString != null) {
      SessionService.currentSession = JSON.parse(sessionString);
      SessionService.isLoggedIn = true;
    }
  }

  public static getCurrentSession(): Session
  {
    return SessionService.currentSession;
  }

  public static getIsLoggedIn(): Boolean
  {
    return SessionService.isLoggedIn;
  }

  static logout(): void
  {
    localStorage.removeItem("currentSession");
    SessionService.isLoggedIn = false;
    SessionService.currentSession = {} as Session;
  }

  async attemptLogin(item: any): Promise<Boolean> {
     localStorage.removeItem("currentSession");

     let httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
       }),
       observe: 'response' as 'body'
     }

     await this.http.post<any>(`${this.baseURL}/api/v1/users/login`, JSON.stringify(item), httpOptions).toPromise().then(
       async (response: HttpResponse<any>) => {

         SessionService.currentSession.user = response.body;
         let body: String | null = response.headers.get('authorization');

         if (body != null)
           SessionService.currentSession.token = body.replace("Bearer ", "");

         localStorage.setItem("currentSession", JSON.stringify(SessionService.currentSession));
       }
     );

     let newSessionString = localStorage.getItem("currentSession");
     if (newSessionString != null) {
       let newSession: Session = JSON.parse(newSessionString);

       return newSession.token != null && newSession.user != null && newSession.token != "";
     } else
       return false;
   }

}
