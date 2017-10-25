# speechkit [![Build Status](https://travis-ci.org/bukinoshita/speechkit.svg?branch=master)](https://travis-ci.org/bukinoshita/speechkit)

> AI-read audio for your news posts


## Install

```bash
$ yarn global add speechkit
```


## Usage

```bash
$ speechkit --help

  Usage:
    $ speechkit login
    $ speechkit ls <newsSiteId> <articleId>
    $ speechkit check <newsSiteId> <articleId>
    $ speechkit create <path-to-json>

  Example:
    $ speechkit login                                  SpeechKit authentication
    $ speechkit ls                                     Show all your news sites
    $ speechkit ls 299 1                               Show specific article
    $ speechkit check 299 1                            Check if article processed
    $ speechkit create article.json                    Create an article with audio

  Options:
    -h, --help                                         Show help options
    -v, --version                                      Show version
```


## Demo

<img src="demo.gif" alt="">


## Related

- [speechkit-js](https://github.com/bukinoshita/speechkit-js) — JavaScript client for interacting with the [SpeechKit API](https://docs.speechkit.io)
- [speechkit-state](https://github.com/bukinoshita/speechkit-state) — Check if the state of SpeechKit article has been processed


## License

MIT © [Bu Kinoshita](https://bukinoshita.io)
