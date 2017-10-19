'use strict'

const Speechkit = require('speechkit-js')
const { bold, gray } = require('chalk')
const shoutError = require('shout-error')

const rightPad = require('./../lib/right-pad')
const short = require('./../lib/short-title')
const getToken = require('./../lib/get-token')

module.exports = async (saveLocal, newsSiteId, articleId) => {
  const token = await getToken(saveLocal)
  const speechkit = new Speechkit(token)

  if (newsSiteId && articleId) {
    let article

    try {
      article = await speechkit.getArticle(newsSiteId, articleId)
      const { id, title, author, summary, share_url, state } = article // eslint-disable-line camelcase

      return console.log(
        `${bold('id:')} ${id}\n${bold('title:')} ${title}\n${bold(
          'author:'
        )} ${author}\n${bold('summary:')} ${summary}\n${bold(
          'share:'
        )} ${share_url}\n${bold('state:')} ${state}` // eslint-disable-line camelcase
      )
    } catch (err) {
      shoutError(err)
    }
  }

  const newsSites = await speechkit.getNewsSites()

  newsSites.forEach((site, index) => {
    speechkit.getArticles(newsSites[index].id).then(articles => {
      if (articles.length > 0) {
        console.log(
          `${bold(newsSites[index].title)} ${gray(
            '#' +
              newsSites[index].id +
              ' (' +
              articles.length +
              ' of ' +
              articles.length +
              ')'
          )}`
        )

        const titleLabel = rightPad(gray('title'), 40)
        const stateLabel = rightPad(gray('state'), 21)
        const idLabel = rightPad(gray('id'), 6)
        const labels = `${titleLabel} ${stateLabel} ${idLabel}`

        console.log(labels)

        articles.forEach(article => {
          if (article.title.length > 0) {
            const title = rightPad(short(article.title), 30)
            const state = rightPad(article.state.toUpperCase(), 11)
            const id = rightPad(article.id)
            const info = `${title} ${state} ${id}`

            console.log(info)
          }
        })

        console.log('\n')
      }
    })
  })
}
