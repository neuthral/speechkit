'use strict'

const Speechkit = require('speechkit-js')
const fs = require('fs-extra')
const shoutError = require('shout-error')
const shoutSuccess = require('shout-success')
const inquirer = require('inquirer')
const spacetime = require('spacetime')
const { gray } = require('chalk')

const getToken = require('./../lib/get-token')
const slugify = require('./../lib/slugify')

module.exports = async (saveLocal, file) => {
  let token
  let speechkit
  let voices
  let data
  let newsSites

  try {
    token = await getToken(saveLocal)
    speechkit = new Speechkit(token)
    voices = await speechkit.getVoices()
    data = await fs.readFile(file, 'utf8')
    newsSites = await speechkit.getNewsSites()
  } catch (err) {
    return shoutError(err)
  }

  const s = new spacetime(new Date())
  const { title, body, author } = JSON.parse(data)
  const choices = voices.map(({ id, name, language }) => ({
    name: `${name} ${gray('(' + language + ')')}`,
    value: id
  }))
  const sites = newsSites.map(({ id, title }) => ({
    name: `${title} ${gray('(' + id + ')')}`,
    value: id
  }))

  if (!body) {
    return shoutError('`body` is required')
  }

  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'title',
      default: title,
      validate: value => {
        if (value.length > 0) {
          return true
        }

        return 'Please enter a title for your article'
      }
    },
    {
      type: 'input',
      name: 'author',
      message: 'author',
      default: author
    },
    {
      type: 'input',
      name: 'date',
      message: 'date',
      default: `${s.year()}-${s.month() + 1}-${s.date()}`
    },
    {
      type: 'list',
      name: 'voice',
      message: 'voice',
      choices
    },
    {
      type: 'list',
      name: 'newsSite',
      message: 'news site',
      choices: sites
    }
  ]

  const answers = await inquirer.prompt(questions)
  const post = {
    external_id: slugify(title) + 10,
    title: answers.title,
    published_at: answers.date,
    author: answers.author,
    body,
    media_attributes: [{ role: 'body', voice_id: answers.voice }]
  }

  try {
    const create = await speechkit.createArticle(answers.newsSite, post)
    if (create) {
      return shoutSuccess(`\`${answers.title}\` was created!`)
    }
  } catch (err) {
    const e = Object.keys(err)

    if (e[0].length > 1) {
      return shoutError(`\`${e}\` ${err[e][0]}`)
    }

    shoutError(err)
  }
}
