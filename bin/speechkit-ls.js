'use strict'

const Speechkit = require('speechkit-js')
const chalk = require('chalk')

const rightPad = require('./../lib/right-pad')
const short = require('./../lib/short-title')
const getToken = require('./../lib/get-token')

module.exports = async saveLocal => {
  const token = await getToken(saveLocal)
  const speechkit = new Speechkit(token)

  const newsSites = await speechkit.getNewsSites()

  newsSites.forEach((site, index) => {
    speechkit.getArticles(newsSites[index].id).then(articles => {
      if (articles.length > 0) {
        console.log(
          `${chalk.bold(newsSites[index].title)} ${chalk.gray(
            '#' +
              newsSites[index].id +
              ' (' +
              articles.length +
              ' of ' +
              articles.length +
              ')'
          )}`
        )

        const titleLabel = rightPad(chalk.gray('title'), 40)
        const stateLabel = rightPad(chalk.gray('state'), 21)
        const idLabel = rightPad(chalk.gray('id'), 6)
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
