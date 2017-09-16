const shelljs = require('shelljs');

/**
 * A helper function that executes a single shell command or JavaScript function.
 * Supports asynchronous JS functions, and executes shell commands in a child process
 * so that the event loop is not blocked while executing the command.
 * @param  {string | function(): (void | Promise<void>)} command
 * @return {Promise<void>} A promise that resolves if the command was succesfull, otherwise throws an `Error`. If the
 * command is a shell command, the error message will be stderr of the command.
 */
module.exports = function executeCommand(command) {
  if (typeof command === 'function') {
    if (command.name) {
      console.info(`${command.name}()`);
    }
    return Promise.resolve(command());
  }

  const shellCommand = command.replace('\n', '').replace(/\s+/g, ' ').trim();
  console.info(shellCommand);
  return new Promise((resolve, reject) =>
    shelljs.exec(shellCommand, (code, stdout, stderr) => {
      if (code === 0) {
        resolve();
      } else {
        const error = new TypeError(stderr || stdout);
        reject(error);
      }
    }),
  );
};
