const executeCommand = require('./executeCommand');

/**
 * A helper function that executes shell commands or JavaScript functions.
 * Supports asynchronous JavaScript functions.
 * Simulates `set -e` behavior in shell, i.e. exits as soon as any commands fail
 * @param  {(string | function(): (void | Promise<void>))[]} commands
 * @return Exit code for the last executed command, a non-zero value indicates failure
 */
module.exports = async function executeCommands(commands) {
  // eslint-disable-next-line no-restricted-syntax
  for (const command of commands) {
    // eslint-disable-next-line no-await-in-loop
    await executeCommand(command);
  }
};
