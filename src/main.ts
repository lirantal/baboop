import ChildProcess from 'node:child_process'
import { RunCommandResult, CommandToRun } from './main.types'

export async function runCommandAndNotify(commandToRun: CommandToRun): Promise<RunCommandResult> {
  const { promise, resolve, reject } = Promise.withResolvers<RunCommandResult>()

  if (!commandToRun) {
    reject(new Error('Please provide a command to run.'))
    return promise
  }

  const child = ChildProcess.spawn(commandToRun, { shell: true, stdio: 'inherit' })

  child.on('exit', async (code: number | null) => {
    const programName = commandToRun
    const exitStatus = code === 0 ? 'successfully ✅' : `with failure ${code} ❌`

    // Display a notification
    const notificationCommand = 'osascript'
    const notificationCommandArguments = ['-e', `display notification "Finished ${exitStatus}" with title "${programName}"`]

    ChildProcess.execFile(notificationCommand, notificationCommandArguments, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return promise
      }

      resolve({
        notification: {
          stdout: stdout.toString(),
          stderr: stderr.toString(),
        },
        program: {
          name: programName,
          code: code ?? 1,
        },
      })

      return promise
    })
  })

  child.on('error', (error) => {
    reject(error)
    return promise
  })

  return promise
}