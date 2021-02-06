import qs from 'querystring'

import axios from 'axios'
import rateLimit from 'axios-rate-limit'

import { GetGamesByTagPayload } from '../@types/GetGamesByTagPayload'
import { GetGameByIdPayload } from '../@types/GetGameByIdPayload'

export function createSteamSpyApi() {
  let rawApi = axios.create({
    baseURL: 'http://steamspy.com/api.php',
  })

  let api = rateLimit(rawApi, {
    maxRequests: 1,
    perMilliseconds: 1100,
    maxRPS: 1,
  })

  async function getGamesByTag(tag: string): Promise<GetGamesByTagPayload> {
    try {
      let query = qs.stringify({ request: 'tag', tag })

      let response = await api.get<GetGamesByTagPayload>('?' + query)

      return response.data
    } catch (error) {
      console.error(error.response.data)

      return error
    }
  }

  async function getGameById(id: number): Promise<GetGameByIdPayload> {
    try {
      let query = qs.stringify({ request: 'appdetails', appid: id })

      let response = await api.get<GetGameByIdPayload>('?' + query)

      console.log('SteamSpy.findGame', id)

      return response.data
    } catch (error) {
      console.error(error.response.data)

      return error
    }
  }

  return {
    getGamesByTag,
    getGameById,
  }
}

export const SteamSpyApi = createSteamSpyApi()
