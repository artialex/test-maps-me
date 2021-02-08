import NodeCache from 'node-cache'

import { SteamApi } from '$server/api.steam'

interface AccountServiceOptions {
  cache: NodeCache
}

export function createAccountService(options: AccountServiceOptions) {
  let { cache } = options

  async function getGames(steamId: string): Promise<number[]> {
    if (!cache.has(steamId)) {
      let games = await SteamApi.getGames(steamId)

      cache.set(steamId, games)
    }

    return cache.get(steamId)
  }

  return {
    getGames,
  }
}

export const AccountService = createAccountService({
  cache: new NodeCache({
    stdTTL: 24 * 60 * 60, // 24 hours
  }),
})
