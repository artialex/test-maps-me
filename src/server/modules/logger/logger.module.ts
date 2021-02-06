import { ExpressModule } from '../../app'
import morgan from 'morgan'

export const LoggerModule: ExpressModule = {
  onRegister(app) {
    app.use(morgan('tiny'))
  },
}
