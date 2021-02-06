import { GameMatcherService } from './game-matcher.service'
import { IdExtractorService } from './id-extractor.service'

export async function gameMatcherController(req, res) {
  let links: string[] = (req.query.links as string).split(',')

  let ids = await Promise.all(links.map(IdExtractorService.extract))

  let matches = await GameMatcherService.findMatches(ids)

  await res.json({ matches })
}
