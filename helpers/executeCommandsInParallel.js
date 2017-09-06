const executeCommand = require('./executeCommand');

/**
 * Executes JS functions or shell commands in parallel and returns 1 as soon
 * as one command or function fails.
 * Supports asynchronous functions.
 * @param {(string | function(): (void | Promise<void>))[]} commands The shell commands or JavaScript functions to execute in parallel
 */
module.exports = function executeCommandsInParallel(commands) {
  // Promise.all rejects as soon as one promise rejects
  return Promise.all(commands.map(executeCommand));
};
