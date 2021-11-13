import { GameExperience, TournamentExperience } from "./profile-entity";

export interface User {
    id: Number,
    username: string,
    email: string,
    "game-experiences": GameExperience[],
    "tournament-experiences": TournamentExperience[]
    password?:string;
}
