import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from "../entities/user-entity";
import {ServiceConfiguration} from "./service-configuration";
import {Profile, Team} from "../entities/profile-entity";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileUrl = "";
  private URL = "";

  constructor(private Http: HttpClient, private serviceConfiguration: ServiceConfiguration) {
    this.profileUrl = serviceConfiguration.baseUrl + "/profiles";
    this.URL = serviceConfiguration.baseUrl;
  }

  getProfileById(id: number): Observable<User>{
    const url = this.profileUrl + id.toString() + "?_embed=competencias&_embed=game-experiences"
    return this.Http.get<User>(url);
  }

  getProfileByUserId(id: number): Observable<Profile>{
    const url = this.profileUrl + "/user/" + id;
    return this.Http.get<Profile>(url);
  }

  updateProfileById(newProfile: Profile): Observable<Profile> {
    const url = this.profileUrl + "/" + newProfile.id;
    return this.Http.put<Profile>(url, newProfile);
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
      userId: userId,
      name: team.name,
      numeroMiembros: team.numeroMiembros
    });
  }

  deleteTeam(id: number | undefined): Observable<any>{
    const url = `${this.URL}/teams/${id}`;
    return this.Http.delete(url);
  }

}

