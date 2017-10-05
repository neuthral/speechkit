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
```


## Demo

<img src="demo.gif" alt="">


## Related

- [speechkit-js](https://github.com/bukinoshita/speechkit-js) — JavaScript client for interacting with the [SpeechKit API](https://docs.speechkit.io)
- [speechkit-state](https://github.com/bukinoshita/speechkit-state) — Check if the state of SpeechKit article has been processed


## License

MIT © [Bu Kinoshita](https://bukinoshita.io)
