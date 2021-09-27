import { FormControl } from "@angular/forms";
import { Game } from "./game-entity";

export interface GameExperience{
    gameId: string,
    experienceLevel: number
}

export interface UserGame {
    experienceLevel: number,
    game: Game[],
    editMode: boolean,
    experienceFormController: FormControl
}

export interface Competencia {
    nombre: string,
    date: string,
    puesto: string
}

export interface User {
    id: Number,
    username: string,
    email: string,
    "game-experiences": GameExperience[],
    competencias: Competencia[]
}