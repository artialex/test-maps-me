import { Game } from './Game'

export interface GetGamesPayload {
  response: {
    game_count: number
    games: Game[]
  }
}
