const shelljs = require('shelljs');

/**
 * A helper function that executes a single shell command or JavaScript function.
 * Supports asynchronous JS functions, and executes shell commands in a child process
 * so that the event loop is not blocked while executing the command.
 * @param  {string | function(): (number | Promise<number>)} command
 * @return Exit code for the executed command, a non-zero value indicates failure
 */
module.exports = async function executeCommands(command) {
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
    code = await new Promise(resolve => shelljs.exec(shellCommand, resolve));
  }

  return code;
};
