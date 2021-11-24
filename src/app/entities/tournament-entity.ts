export interface Tournament {
    title: string,
    description: string,
    prizePool: number,
    createdAt: string,
    isTeamMode: false,
    id: number,
    userId: number,
    gameId: number,
    urlToImage: string,
    tournamentDate: Date,
    tournamentStatus: boolean,
    tournamentCapacity: number,
    inTournament: boolean

}
