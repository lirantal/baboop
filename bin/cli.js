#!/usr/bin/env node
import { debuglog } from 'node:util'
import { runCommandAndNotify } from '../src/main.js'

const debug = debuglog('baboop')

const commandToRun = process.argv.slice(2).join(' ')
const result = await runCommandAndNotify(commandToRun)
debug(result)
