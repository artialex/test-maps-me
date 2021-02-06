import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import css from './TextInput.module.css'

export function TextInput(
  props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  return <input type="text" className={css.root} {...props} />
}
