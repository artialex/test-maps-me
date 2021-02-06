import express from 'express'
import { ExpressModule } from '../@types/ExpressModule'

export function createServerApplication() {
  let app = express()

  function use(modules: ExpressModule[]) {
    modules.forEach((module) => {
      module.onRegister?.(app)
    })
  }

  function run() {
    app.listen(process.env.PORT, () => {
      console.log('started on port', process.env.PORT)
    })
  }

  return {
    use,
    run,
  }
}
