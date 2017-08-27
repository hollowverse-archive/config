const executeCommand = require('./executeCommand');

/**
 * Executes JS functions or shell commands in parallel and returns 1 as soon
 * as one command or function fails.
 * Supports asynchronous functions.
 * @param {(string | function(): (number | Promise<number>))[]} commands The shell commands or JavaScript functions to execute in parallel
 * @typedef {1 | 0} ReturnCode
 * @return {Promise<ReturnCode>} Returns `1` on failure, `0` otherwise.
 */
module.exports = async function executeCommandsInParallel(commands) {
  try {
    // Promise.all rejects as soon as one promise rejects
    await Promise.all(
      commands.map(async command => {
        const code = await executeCommand(command);
        if (code !== 0) {
          throw new Error();
        }
      }),
    );
    return 0;
  } catch (e) {
    return 1;
  }
};
