import NodeCache from 'node-cache'

import { GetGamesByTagPayload, SteamSpyApi } from '$server/api.steam-spy'
import { CachedGame } from '$server/games'

interface GameServiceOptions {
  cache: NodeCache
}

export function createGameService(options: GameServiceOptions) {
  let { cache } = options

  async function hydrate(): Promise<void> {
    let data: GetGamesByTagPayload

    if (process.env.HYDRATE_FROM_API) {
      console.log('game.service :: 15', 'hydrating from API')
      data = await SteamSpyApi.getGamesByTag('Multiplayer')
    } else {
      console.log('game.service :: 15', 'hydrating from file')
      data = require('./games.data.json')
    }

    cache.mset(
      Object.entries(data).map(([key, value]) => ({
        key,
        val: {
          name: value.name,
          hasMultiplayer: true,
        },
      }))
    )
  }

  async function getGame(id: number): Promise<CachedGame> {
    if (!cache.has(id)) {
      let game = await SteamSpyApi.getGameById(id)

      cache.set(id, {
        name: game.name,
        hasMultiplayer: Object.keys(game.tags).includes('Multiplayer'),
      })
    }

    return cache.get(id)
  }

  return {
    hydrate,
    getGame,
  }
}

export const GameService = createGameService({
  cache: new NodeCache({
    stdTTL: 24 * 60 * 60, // 24 hours
  }),
})
