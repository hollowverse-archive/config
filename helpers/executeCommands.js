// @ts-check
const shelljs = require('shelljs');

/**
 * A helper function that executes shell commands or JavaScript functions.
 * Supports asynchronous operations.
 * Simulates `set -e` behavior in shell, i.e. exits as soon as any commands fail
 * @param  {(string | function(): (number))[]} commands
 * @return Exit code for the last executed command, a non-zero value indicates failure
 */
module.exports = async function executeCommands(commands) {
  for (const command of commands) {
    let code = 0;
    if (typeof command === 'function') {
      if (command.name) {
        console.info(`${command.name}()`);
      }
      try {
        code = await Promise.resolve(command());
      } catch (e) {
        console.error(e);
        code = 1;
      }
    } else {
      const shellCommand = command.replace('\n', '').replace(/\s+/g, ' ').trim();
      console.info(shellCommand);
      code = await new Promise((resolve) => shelljs.exec(shellCommand, resolve));
    }

    // Return on first non-zero exit value
    if (code !== 0) {
      return code;
    }
  }

  return 0;
}
