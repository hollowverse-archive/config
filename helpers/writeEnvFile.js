const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

/**
 * Writes a JSON file that contains various
 * information about App Engine configuration, including the branch name.
 *
 * This is working around the fact that App Engine does not provide this information
 * as environment variables for Docker-based runtimes.
 * The file should be written on CI and deployed with the app so that it can
 * be accessed at runtime.
 * @param {string} service The App Engine service name to be included in the env file
 * @param {{ BRANCH?: string, PROJECT?: string, }} env The environment object
 * @param {string} path The path where the file should be written
 */
module.exports = async function writeEnvFile(service, env, path) {
  await writeFile(path, JSON.stringify({
    project: env.PROJECT,
    branch: env.BRANCH,
    service,
  }, undefined, 2));

  return 0;
};
