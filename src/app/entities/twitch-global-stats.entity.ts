export interface TwitchGame {
    id: string,
    name: string,
    "box_art_url": string
}

export interface TwitchPagination {
    cursor: string
}

export interface TopGames {
    data: TwitchGame[],
    pagination: TwitchPagination
}