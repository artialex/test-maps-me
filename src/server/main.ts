import { config } from 'dotenv'

import { createServerApplication } from './app'

import { GameMatcherModule } from '$server/games.matcher'
import { WebpackModule } from '$server/webpack'
import { LoggerModule } from '$server/logger'
import { ErrorsModule } from '$server/errors'

config()

if (!process.env.STEAM_API_KEY) {
  console.log('Error: STEAM_API_KEY not set\n')
  process.exit(0)
}

async function bootstrap() {
  let app = createServerApplication()

  await app.use([ErrorsModule, LoggerModule, GameMatcherModule, WebpackModule])

  await app.run()
}

void bootstrap()
