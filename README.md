# pwdhash-cli
Command line interface for generating pwdhash password hashes

Takes the files from pwdhash.com and creates a command line interface for it
using node.

Prompts you for a URI and passphrase, then generates the pwdhash for it and
copies the generated password to the clipboard.

If you currently have a URL on your clipboard it will automatically
be used.


Example:
```
> ./pwdhash.js
URI: www.example.com
Password:
-- saved password to clipboard --

> nQhNu0bOgdPMU9
```
