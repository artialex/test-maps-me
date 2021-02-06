const { resolve } = require('path')

const Dirs = {
  root(path = '') {
    return resolve(__dirname, '..', path)
  },

  config(path = '') {
    return resolve(Dirs.root('.config'), path)
  },

  src(path = '') {
    return resolve(Dirs.root('src'), path)
  },

  modules(path = '') {
    return resolve(Dirs.src('modules'), path)
  },
}

module.exports = { Dirs }
