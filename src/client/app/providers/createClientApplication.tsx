import { render } from 'react-dom'
import React, { ReactElement } from 'react'

import { Providers } from '../components/Providers'

interface ApplicationOptions {
  root: ReactElement
  container: string
  providers?: any[]
}

export function createClientApplication(options: ApplicationOptions) {
  let { root, container, providers } = options

  function run() {
    render(<Providers components={providers}>{root}</Providers>, document.querySelector(container))
  }

  return {
    run,
  }
}
