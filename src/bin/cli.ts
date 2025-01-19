import { debuglog } from 'node:util'
import { runCommandAndNotify } from '../main.ts'

const debug = debuglog('baboop')

async function init () {
  const commandToRun = process.argv.slice(2).join(' ')
  // file deepcode ignore IndirectCommandInjection: <accepted user input for the CLI is part of how this program works>
  const result = await runCommandAndNotify(commandToRun)
  debug(result.toString())
}

init()
