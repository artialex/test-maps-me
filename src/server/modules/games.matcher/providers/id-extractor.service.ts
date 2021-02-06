import NodeCache from 'node-cache'
import intersect from 'intersect'

import { AccountService } from '$server/accounts'
import { CachedGame, GameService } from '$server/games'
import { SteamApi } from '$server/api.steam'

interface IdExtractorServiceOptions {
  cache: NodeCache
}

export function createIdExtractorService(options: IdExtractorServiceOptions) {
  let { cache } = options

  async function extract(link: string): Promise<string> {
    let id: string

    // https://steamcommunity.com/id/<url>/...
    if (link.includes('//steamcommunity.com/id/')) {
      let split = link.split('/')
      let index = split.findIndex((_) => _ === 'id')
      let vanityUrl = split[index + 1]

      if (!cache.has(vanityUrl)) {
        let id = await SteamApi.getId(vanityUrl)

        cache.set(vanityUrl, id)
      }

      id = cache.get(vanityUrl)
    }

    // https://steamcommunity.com/profiles/<id>/...
    if (link.includes('//steamcommunity.com/profiles/')) {
      let split = link.split('/')
      let index = split.findIndex((_) => _ === 'profiles')
      id = split[index + 1]
    }

    return id
  }

  return {
    extract,
  }
}

export const IdExtractorService = createIdExtractorService({
  cache: new NodeCache({
    stdTTL: 24 * 60 * 60, // 24 hours
  }),
})
