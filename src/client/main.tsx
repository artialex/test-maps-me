import * as React from 'react'

import { createClientApplication } from './app'

import { RootComponent } from '$client/core'

async function bootstrap() {
  let app = createClientApplication({
    root: <RootComponent />,
    container: '#app',
  })

  await app.run()
}

void bootstrap()

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  module.hot?.accept()
}
