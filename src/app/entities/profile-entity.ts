import {Game} from "./game-entity";
import {FormControl} from "@angular/forms";
import {User} from "./user-entity";

export interface Profile {
  id: number,
  user: User,
  "gameExperiences": GameExperience[],
  "tournamentExperiences": TournamentExperience[],
  "favoriteGames": FavoriteGame[],
  "streamerSponsors": StreamerSponsor[],
  "streamingCategories": StreamingCategory[],
}

export interface GameExperience{
  id?: number,
  gameId: number,
  experience: number,
  userId: number,
  editMode?: boolean,
  gameName?: string
}

export interface Team
{
  id?: number,
  userId: number,
  name: string,
  numeroMiembros: number,
  nombreFormController?: FormControl,
  numeroMiembrosFormController?: FormControl
}

export interface TournamentExperience {
  id?: number,
  name: string,
  date?: string,
  position: string,
  editMode?: boolean,
  nameFormController?: FormControl,
  positionFormController?: FormControl
}

export interface FavoriteGame {
  id?: number,
  userId: number,
  gameId: number,
  gameName?: string
}

export interface StreamerSponsor {
  id?: number,
  userId: number,
  name: string,
}

export interface StreamingCategory
{
  id?: number,
  name: string
}

//Si borro esto, la app no arranca
//profile.service llama a esta interfaz

export interface UserGame {
  id: number,
  experienceLevel: number,
  game: Game,
  editMode: boolean,
  experienceFormController: FormControl
}
