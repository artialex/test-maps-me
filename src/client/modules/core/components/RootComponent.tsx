import React from 'react'

import { GameMatcher } from '$client/game-matcher'

import css from './RootComponent.module.css'

export function RootComponent() {
  return (
    <div className={css.root}>
      <GameMatcher />
    </div>
  )
}
