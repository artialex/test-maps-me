import qs from 'querystring'

import axios from 'axios'

import { GetIdPayload } from '../@types/GetIdPayload'
import { GetGamesPayload } from '../@types/GetGamesPayload'

export function createSteamApi() {
  let api = axios.create({
    baseURL: 'http://api.steampowered.com',
  })

  api.interceptors.request.use((config) => {
    return {
      ...config,
      params: {
        ...config.params,
        key: process.env.STEAM_API_KEY,
      },
    }
  })

  async function getId(accountName: string): Promise<string> {
    let endpoint = '/ISteamUser/ResolveVanityURL/v0001/'
    let query = qs.stringify({ vanityurl: accountName })

    let response = await api.get<GetIdPayload>(endpoint + '?' + query)

    return response.data.response.steamid
  }

  async function getGames(id: string): Promise<number[]> {
    let endpoint = '/IPlayerService/GetOwnedGames/v0001/'
    let query = qs.stringify({
      steamid: id,
      format: 'json',
    })

    let response = await api.get<GetGamesPayload>(endpoint + '?' + query)

    return (response.data.response.games ?? []).map((_) => _.appid)
  }

  return {
    getId,
    getGames,
  }
}

export const SteamApi = createSteamApi()
