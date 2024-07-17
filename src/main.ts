import ChildProcess from 'node:child_process'

export async function runCommandAndNotify (commandToRun) {
  return new Promise((resolve, reject) => {
    if (!commandToRun) {
      return reject(new Error('Please provide a command to run.'))
    }

    const child = ChildProcess.spawn(commandToRun, { shell: true, stdio: 'inherit' })

    child.on('exit', async (code) => {
      try {
        const programName = commandToRun
        const exitStatus = code === 0 ? 'successfully ✅' : `with failure ${code} ❌`

        // Display a notification
        const notificationCommand = 'osascript'
        const notificationCommandArguments = ['-e', `display notification "Finished ${exitStatus}" with title "${programName}"`]

        ChildProcess.execFile(notificationCommand, notificationCommandArguments, (error, stdout, stderr) => {
          if (error) {
            return reject(error)
          }

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
