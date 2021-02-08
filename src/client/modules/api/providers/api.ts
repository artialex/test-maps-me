import axios from 'axios'

let client = axios.create({
  baseURL: '/',
})

export function createApi() {
  async function findMatches(links: string[] = []) {
    let endpoint = '/matches'
    let query = 'links=' + links.join(',')

    let response = await client.get(endpoint + '?' + query)

    return response.data
  }

  return {
    findMatches,
  }
}

export const Api = createApi()
