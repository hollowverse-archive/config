const executeCommand = require('./executeCommand');

/**
 * Retries a JS or shell command multiple times before giving up.
 * @param {string | function(): (void | Promise<void>)} command The shell command or JavaScript function to execute,
 * the JS function must return a number. `0` indicates success, any other value indicates failure.
 * @param {number} maxNumAttempts How many times should the `command` be retried
 */
module.exports = async function retryCommand(command, maxNumAttempts = 5) {
  let numAttempts = 0;
  while (numAttempts < maxNumAttempts) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await executeCommand(command);
      break;
    } catch (e) {
      numAttempts += 1;
      if (numAttempts === maxNumAttempts) {
        throw new Error(e);
      }
    }
  }
};
