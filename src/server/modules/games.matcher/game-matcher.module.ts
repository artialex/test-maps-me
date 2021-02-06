import { GameService } from '$server/games'

import { ExpressModule } from '../../app'
import { gameMatcherController } from './providers/game-matcher.controller'

export const GameMatcherModule: ExpressModule = {
  onRegister(app) {
    void GameService.hydrate()

    app.get('/matches', gameMatcherController)
  },
}
