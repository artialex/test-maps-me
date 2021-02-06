import NodeCache from 'node-cache'
import intersect from 'intersect'

import { AccountService } from '$server/accounts'
import { CachedGame, GameService } from '$server/games'

interface GameMatcherServiceOptions {
  cache: NodeCache
}

export function createGameMatcherService(options: GameMatcherServiceOptions) {
  let { cache } = options

  async function findMatches(ids: string[]): Promise<string[]> {
    let key = ids.sort().join('+')

    if (!cache.has(key)) {
      let matchedGameIds: number[][] = await Promise.all(ids.map(AccountService.getGames))

      let intersectedGameIds: number[] = intersect.big(matchedGameIds)

      let matchedGames: CachedGame[] = await Promise.all(
        intersectedGameIds.map(GameService.getGame)
      )

      let matchedMultiplayerGames = matchedGames.filter((_) => _.hasMultiplayer).map((_) => _.name)

      cache.set(key, matchedMultiplayerGames)
    }

    return cache.get(key)
  }

  return {
    findMatches,
  }
}

export const GameMatcherService = createGameMatcherService({
  cache: new NodeCache({
    stdTTL: 24 * 60 * 60, // 24 hours
  }),
})
