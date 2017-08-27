const executeCommand = require('./executeCommand');

/**
 * A helper function that executes shell commands or JavaScript functions.
 * Supports asynchronous operations.
 * Simulates `set -e` behavior in shell, i.e. exits as soon as any commands fail
 * @param  {(string | function(): (number | Promise<number>))[]} commands
 * @return Exit code for the last executed command, a non-zero value indicates failure
 */
module.exports = async function executeCommands(commands) {
  // eslint-disable-next-line no-restricted-syntax
  for (const command of commands) {
    // eslint-disable-next-line no-await-in-loop
    const code = await executeCommand(command);

    // Return on first non-zero exit value
    if (code !== 0) {
      return code;
    }
  }

  return 0;
};
