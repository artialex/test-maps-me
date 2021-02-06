import React, { useState } from 'react'
import { nanoid } from 'nanoid'

import { TextInput } from '$client/ui'
import { Api } from '$client/api'

import css from './GameMatcher.module.css'

export function GameMatcher() {
  let [links, setLinks] = useState([
    { id: nanoid(), value: '' },
    { id: nanoid(), value: '' },
  ])

  let [results, setResults] = useState(null)
  let [loading, setLoading] = useState(false)

  function handleChange(value, id) {
    setLinks((links) => links.map((link) => (link.id === id ? { ...link, value } : link)))
  }

  function handleAddLink() {
    setLinks((links) => links.concat({ id: nanoid(), value: '' }))
  }

  function handleRemoveLink(id) {
    setLinks((links) => links.filter((link) => link.id !== id))
  }

  function handleSubmit(event) {
    event.preventDefault()

    setLoading(true)
    setResults(null)

    Api.findMatches(links.map((_) => _.value)).then((results) => {
      setLoading(false)
      setResults(results.matches)
    })
  }

  return (
    <div className={css.root}>
      <h3 className={css.header}>Paste 2 or more Steam account links</h3>
      <form onSubmit={handleSubmit}>
        {links.map(({ id, value }) => (
          <div key={id} className={css.row}>
            <TextInput
              placeholder="https://steamcommunity.com/..."
              value={value}
              onChange={(event) => handleChange(event.target.value, id)}
            />
            {links.length > 1 && (
              <button type="button" onClick={() => handleRemoveLink(id)} className={css.button}>
                &times;
              </button>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={handleAddLink} className={css.button}>
            +
          </button>
        </div>
        <button type="submit" disabled={links.some((_) => _.value === '')}>
          Find matches
        </button>
      </form>
      <div className={css.result}>
        {loading && <div>Loading...</div>}

        {results?.length
          ? results.map((game) => <div>{game}</div>)
          : results != null && <div>No matches, perhaps some accounts are private</div>}
      </div>
    </div>
  )
}
