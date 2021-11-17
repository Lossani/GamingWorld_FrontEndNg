import {FavouriteGame, GameExperience, StreamerSponsor, TournamentExperience} from "./profile-entity";

export interface User {
    id: Number,
    username: string,
    email: string,
    "game-experiences": GameExperience[],
    "tournament-experiences": TournamentExperience[],
    "favourite-games": FavouriteGame[],
    "streamer-sponsors": StreamerSponsor[],
    password?:string;
}
