import { promisify } from 'node:util'
import { spawn, execFile } from 'node:child_process'
const execFilePromise = promisify(execFile)

export async function runCommandAndNotify (commandToRun) {
  return new Promise((resolve, reject) => {
    if (!commandToRun) {
      return reject(new Error('Please provide a command to run.'))
    }

    console.log(`Running command: ${commandToRun}`)

    const child = spawn(commandToRun, { shell: true, stdio: 'inherit' })

    child.on('exit', async (code) => {
      try {
        const programName = commandToRun
        const exitStatus = code === 0 ? 'successfully ✅' : `with failure ${code} ❌`

        // Display a notification
        const notificationCommand = 'osascript'
        const notificationCommandArguments = ['-e', `display notification "Finished ${exitStatus}" with title "${programName}"`]

        const { stdout, stderr } = await execFilePromise(notificationCommand, notificationCommandArguments)

        return resolve({
          notification: {
            stdout,
            stderr,
          },
          program: {
            name: programName,
            code,
          },
        })
      } catch (error) {
        return reject(error)
      }
    })

    child.on('error', (error) => {
      return reject(error)
    })
  })
}
