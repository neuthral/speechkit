'use strict'

const speechkitState = require('speechkit-state')
const shoutSuccess = require('shout-success')

const getToken = require('./../lib/get-token')

module.exports = async (saveLocal, newsSiteId, articleId) => {
  const token = await getToken(saveLocal)
  const isProcessed = await speechkitState(token, newsSiteId, articleId)
  const message = isProcessed
    ? shoutSuccess('Your article is ready!')
    : shoutSuccess('Your article is processing...')

  return message
}
