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
    $ speechkit login
    $ speechkit ls <newsSiteId> <articleId>
    $ speechkit check <newsSiteId> <articleId>

  Example:
    $ speechkit login                                  SpeechKit authentication
    $ speechkit ls                                     Show all your news sites
    $ speechkit ls 299 1                               Show specific article
    $ speechkit check 299 1                            Check if article processed

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
let newsSiteId
let articleId

switch (input) {
  case 'login':
    speechkitLogin(saveLocal)
    break

  case 'ls':
    newsSiteId = cli.input[1]
    articleId = cli.input[2]

    speechkitLs(saveLocal, newsSiteId, articleId)
    break

  case 'check':
    newsSiteId = cli.input[1]
    articleId = cli.input[2]

    speechkitCheck(saveLocal, newsSiteId, articleId)
    break

  default:
    cli.showHelp()
}
