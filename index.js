#!/usr/bin/env node
'use strict'

const SaveLocal = require('save-local')
const meow = require('meow')
const updateNotifier = require('update-notifier')

const speechkitLogin = require('./bin/speechkit-login')
const speechkitLs = require('./bin/speechkit-ls')
const speechkitCheck = require('./bin/speechkit-check')

const cli = meow(
  `
  Usage:
    $ speechkit login                                  SpeechKit authentication
    $ speechkit ls                                     Show all your news sites
    $ speechkit check <newsSiteId> <articleId>         Check if article processed

  Example:
    $ speechkit login
    $ speechkit ls
    $ speechkit check 299 1

  Options:
    -h, --help                                         Show help options
    -v, --version                                      Show version
`,
  {
    alias: {
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const saveLocal = new SaveLocal('speechkit-store')
const input = cli.input[0] ? cli.input[0].toLowerCase() : undefined

switch (input) {
  case 'login':
    speechkitLogin(saveLocal)
    break

  case 'ls':
    const id = cli.input[1] ? cli.input[1] : undefined
    speechkitLs(saveLocal, id)
    break

  case 'check':
    const newsSiteId = cli.input[1]
    const articleId = cli.input[2]

    speechkitCheck(saveLocal, newsSiteId, articleId)
    break

  default:
    cli.showHelp()
}
