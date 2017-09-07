const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

/**
 * @param {string} path Full path to the file to be written, including the file name and extension
 * @param {any} data JavaScript object to write, must be serializable
 */
module.exports = function writeJSONFile(path, data) {
  return writeFile(path, JSON.stringify(data, undefined, 2));
};
