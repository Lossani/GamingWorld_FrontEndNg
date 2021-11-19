import {Game} from "./game-entity";
import {FormControl} from "@angular/forms";

export interface GameExperience{
  id?: number,
  gameId: number,
  experienceLevel: number,
  userId: number
}

//Esto creo que no va
export interface UserGame {
  id: number,
  experienceLevel: number,
  game: Game,
  editMode: boolean,
  experienceFormController: FormControl
}

export interface UserCompetencia {
  name: string,
  date: string,
  position: string
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
  id: number,
  name: string,
  date: string,
  position: string,
  editMode: boolean,
  nameFormController: FormControl,
  positionFormController: FormControl
}

export interface FavoriteGame {
  id: number,
  userId: number,
  gameId: number,
}

export interface StreamerSponsor {
  id: number,
  userId: number,
  name: string,
}
