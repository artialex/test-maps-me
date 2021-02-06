import PrettyError from 'pretty-error'

import { ExpressModule } from '../../app'

export const ErrorsModule: ExpressModule = {
  onRegister(app) {
    let pe = new PrettyError()

    process.on('unhandledRejection', (err) => {
      console.log('errors.module :: 9', pe.render(err))
    })

    pe.skipNodeFiles()
  },
}
