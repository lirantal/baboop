import { test } from 'node:test'
import assert from 'node:assert'
import { runCommandAndNotify } from '../src/main.js'
import ChildProcess from 'node:child_process'

test('CLI doesnt receive any arguments to run and throws an error', async (t) => {
  await assert.rejects(async () => await runCommandAndNotify(), {
    message: 'Please provide a command to run.',
  })
})

test('CLI program runs and completes successfully', async (t) => {
  const mockedExitCode = 0
  t.mock.method(ChildProcess, 'execFile', (cmd, args, callback) => {
    callback(null, 'stdout', 'stderr')
  })
  const spy = t.mock.method(ChildProcess, 'spawn', (cmd) => {
    return {
      on: (event, callback) => {
        if (event === 'exit') {
          callback(mockedExitCode)
        }
      },
    }
  })

  const commandToRun = 'ls'
  const result = await runCommandAndNotify(commandToRun)
  assert.strictEqual(spy.mock.calls.length, 1)
  assert.strictEqual(result.program.code, 0)
})

test('CLI program runs and completes with a failure', async (t) => {
  const mockedExitCode = 1
  t.mock.method(ChildProcess, 'execFile', (cmd, args, callback) => {
    callback(null, 'stdout', 'stderr')
  })
  const spy = t.mock.method(ChildProcess, 'spawn', (cmd) => {
    return {
      on: (event, callback) => {
        if (event === 'exit') {
          callback(mockedExitCode)
        }
      },
    }
  })

  const commandToRun = 'ls'
  const result = await runCommandAndNotify(commandToRun)
  assert.strictEqual(spy.mock.calls.length, 1)
  assert.strictEqual(result.program.code, 1)
})

test('CLI program runs and completes successfully and uses a long program name', async (t) => {
  const mockedExitCode = 0
  t.mock.method(ChildProcess, 'execFile', (cmd, args, callback) => {
    callback(null, 'stdout', 'stderr')
  })
  const spy = t.mock.method(ChildProcess, 'spawn', (cmd) => {
    return {
      on: (event, callback) => {
        if (event === 'exit') {
          callback(mockedExitCode)
        }
      },
    }
  })

  const commandToRun = 'npm run lint:fix'
  const result = await runCommandAndNotify(commandToRun)
  assert.strictEqual(spy.mock.calls.length, 1)
  assert.strictEqual(result.program.code, 0)
})
