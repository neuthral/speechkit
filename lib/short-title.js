'use strict'

module.exports = string => {
  const short = string.length > 25 ? `${string.substring(0, 25)}...` : string

  return short
}
