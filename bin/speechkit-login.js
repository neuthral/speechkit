'use strict'

const inquirer = require('inquirer')
const shoutSuccess = require('shout-success')
const chalk = require('chalk')

module.exports = async saveLocal => {
  return inquirer
    .prompt([
      {
        message: `Your API Key ${chalk.gray(
          '(it will only store in your computer)'
        )}`,
        name: 'token'
      }
    ])
    .then(({ token }) => {
      saveLocal.set({ name: 'token', value: token })
      shoutSuccess(`You're now logged in`)
    })
}
