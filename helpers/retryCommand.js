const executeCommands = require('./executeCommands');

/**
 * Retries a JS or shell command multiple times before giving up
 * @param {string | function(): (number | Promise<number>)} command The shell command or JavaScript function to execute, the JS function must return a number. `0` indicates success, any other value indicates failure.
 * @param {number} maxNumAttempts How many times should the `command` be retried
 */
module.exports = async function retryCommand(command, maxNumAttempts = 5) {
  let numAttempts = 0;
  let code = null;

  while (code !== 0 && numAttempts < maxNumAttempts) {
    code = await executeCommands([command]);
    numAttempts += 1;
  }

  return code;
};
