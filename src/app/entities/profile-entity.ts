import {Game} from "./game-entity";
import {FormControl} from "@angular/forms";

export interface GameExperience{
  id?: number,
  gameId: number,
  experienceLevel: number,
  userId: number
}

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
