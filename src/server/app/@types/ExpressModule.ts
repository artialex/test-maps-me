import { Application } from 'express'
import { Server } from 'http'

export interface ExpressModule {
  onRegister?: (app?: Application) => void
  onApplicationStart?: () => void
  afterStart?: (server?: Server) => void
}
