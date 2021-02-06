import NodeCache from 'node-cache'

import { SteamApi } from '$server/api.steam'

interface AccountServiceOptions {
  cache: NodeCache
}

export function createAccountService(options: AccountServiceOptions) {
  let { cache } = options

  async function getGames(id: string): Promise<number[]> {
    if (!cache.has(id)) {
      let games = await SteamApi.getGames(id)

      cache.set(id, games)
    }

    return cache.get(id)
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
