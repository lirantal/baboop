import { test, describe, beforeEach, mock } from 'node:test'
import assert from 'node:assert'
import { runCommandAndNotify } from '../src/main.ts'
import ChildProcess from 'node:child_process'

describe('CLI program', () => {
  beforeEach(() => {
    // Reset the mocks before each test
    mock.reset()
  })

  test('CLI doesnt receive any arguments to run and throws an error', async () => {
    await assert.rejects(async () => await runCommandAndNotify(), {
      message: 'Please provide a command to run.',
    })
  })

  test('CLI program runs and completes successfully', async (t) => {
    const mockedExitCode = 0
    t.mock.method(ChildProcess, 'execFile', (cmd, args, callback) => {
      callback(null, 'stdout', 'stderr')
    })
    const spy = t.mock.method(ChildProcess, 'spawn', () => {
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
    t.mock.reset()
  })

  test('CLI program runs and completes with a failure', async (t) => {
    const mockedExitCode = 1
    t.mock.method(ChildProcess, 'execFile', (cmd, args, callback) => {
      callback(null, 'stdout', 'stderr')
    })
    const spy = t.mock.method(ChildProcess, 'spawn', () => {
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
    t.mock.reset()
  })

  test('CLI program runs and completes successfully and uses a long program name', async (t) => {
    const mockedExitCode = 0
    t.mock.method(ChildProcess, 'execFile', (cmd, args, callback) => {
      callback(null, 'stdout', 'stderr')
    })
    const spy = mock.method(ChildProcess, 'spawn', () => {
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
    mock.reset()
  })

  test('CLI program fails to execute the `osascript` command and throws an error', async (t) => {
    t.mock.method(ChildProcess, 'execFile', (cmd, args, callback) => {
      callback(new Error('Failed to execute command'))
    })

    const commandToRun = 'ls'
    await assert.rejects(async () => await runCommandAndNotify(commandToRun), {
      message: 'Failed to execute command',
    })
    mock.reset()
  })

  test('CLI program fails to execute the command and throws an error', async () => {
    mock.method(ChildProcess, 'spawn', () => {
      return {
        on: (event, callback) => {
          if (event === 'error') {
            callback(new Error('Failed to execute command'))
          }
        },
      }
    })

    const commandToRun = 'ls'
    await assert.rejects(async () => await runCommandAndNotify(commandToRun), {
      message: 'Failed to execute command',
    })
    mock.reset()
  })
})
