<!-- markdownlint-disable -->

<p align="center"><h1 align="center">
  baboop
</h1>

<p align="center">
  display notification on macOS desktop
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/baboop"><img src="https://badgen.net/npm/v/baboop" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/baboop"><img src="https://badgen.net/npm/license/baboop" alt="license"/></a>
  <a href="https://www.npmjs.org/package/baboop"><img src="https://badgen.net/npm/dt/baboop" alt="downloads"/></a>
  <a href="https://github.com/lirantal/baboop/actions?workflow=CI"><img src="https://github.com/lirantal/baboop/workflows/CI/badge.svg" alt="build"/></a>
  <a href="https://codecov.io/gh/lirantal/baboop"><img src="https://badgen.net/codecov/c/github/lirantal/baboop" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/lirantal/baboop"><img src="https://snyk.io/test/github/lirantal/baboop/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
</p>

# Baboop

display notification on macOS desktop

## Install

```bash
npm install --save baboop
```
## Usage: CLI

Will display a macOS notification with the name `ls -alh` once the `ls` command finished running:

```bash
npx baboop ls -alh
```

## Usage: API

```js
import { runCommandAndNotify } from 'baboop'

async function init() {
  const commandToRun = 'ls -alh';
  const result = await runCommandAndNotify(commandToRun)
}

init();
// will display a macOS notification with the name `ls -alh`
// once the `ls` command finished running
//
```

## Contributing

Please consult [CONTRIBUTING](./github/CONTRIBUTING.md) for guidelines on contributing to this project.

## Author

**baboop** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.
