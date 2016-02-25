#!/usr/bin/env node

/**
 * PwdHash command line wrapper. Wraps the original javascript files from
 * pwdhash.com and lets you generate password hashes from the terminal.
 *
 *
 * Prompts you for a URI and passphrase, then generates the pwdhash for it and
 * copies the generated password to the clipboard.
 *
 * If you currently have a URL on your clipboard it will automatically
 * be used.
 */
var Promise = require('bluebird')
var read = Promise.promisify(require('read'))
var copypaste = require('copy-paste')

var pwdhash = require('./lib/pwdhash')

var uriPromise

// if url on clipboard, use it
var onClipboard = copypaste.paste();
if (onClipboard && onClipboard.substr(0, 4) === 'http') {
  console.log('Found URI: ', onClipboard)
  uriPromise = new Promise(function (resolve) {
    resolve(onClipboard)
  })
} else {
  uriPromise = read({prompt: 'URI: '})
}

uriPromise.then(function (uri) {
  return [
    uri,
    read({silent: true, prompt: 'Password: '})
  ]
}).all().then(function (info) {
  var password = '' + pwdhash.generate(info[0], info[1])
  // put password on clipboard
  copypaste.copy(password)
  console.log('-- saved password to clipboard --')
});
