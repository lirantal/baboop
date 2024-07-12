#!/usr/bin/env node
import { runCommandAndNotify } from '../src/main.js'

const commandToRun = process.argv.slice(2).join(' ')
await runCommandAndNotify(commandToRun)
