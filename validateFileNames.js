#! /usr/bin/env node

// @ts-check

const shelljs = require('shelljs');
const minimatch = require('minimatch');
const path = require('path');

// Regex that defines our file and directory naming convention
const camelOrPascalCasedFileNameRegex = /^[.]?([a-zA-Z])+([0-9]|[a-zA-Z]|[.])*$/;
const twoConsecutiveUpperCaseLettersRegex = /^.*[A-Z]{2}.*$

// Files and directories that are exempt from the naming convention
let ignoredPatterns = ['README.md', 'Dockerfile', 'LICENSE.md', 'customTypings/*', 'typings/*'];

const configFile = `${process.cwd()}/commonconfig.js`;

try {
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const config = require(configFile);

  if (Array.isArray(config.ignoredPatterns)) {
    ignoredPatterns = config.ignoredPatterns;
  }
} catch (e) {
  console.info('Error reading "commonconfig.js", falling back to default configuration');
}

/**
 * @param {string} filePathComponent
 */
function isCamelOrPascalCase(filePathComponent) {
  return camelOrPascalCasedFileNameRegex.test(filePathComponent);
}

/**
 * @param {string} filePathComponent
 */
function hasTwoConsecutiveUpperCaseLetters(filePathComponent) {
  return twoConsecutiveUpperCaseLettersRegex.test(filePathComponent);
}

/**
 * @param {string} filePath
 */
function isIgnored(filePath) {
  return ignoredPatterns.some(ignoredFileOrDirectory => {
    return minimatch(filePath, ignoredFileOrDirectory, { matchBase: true });
  });
}

/**
 * @param {string} text
 */
function red(text) {
  return `\x1b[31m${text}\x1b[0m`;
}

/**
 * @param {string} text
 */
function underline(text) {
  return `\x1b[4m${text}\x1b[0m`;
}

function getFiles() {
  // Let's only validate files managed by git
  const { stdout } = shelljs.exec('git ls-files', { silent: true });
  if (typeof stdout === 'string') {
    // remove empty strings from the array and remove files in ignored paths
    return stdout.split('\n').filter(file => file.length !== 0 && !isIgnored(file));
  }

  throw new Error('Unable to read git tree, is this a git repository?');
}

// Get the list of files that we're interested in validating
const files = getFiles();

// Create a place to store files in violation of naming convention

/** @type {Array<string>} */
const filesInViolation = [];

// Now let's go through the files to see if they violate the naming convention
files.forEach(file => {
  // Split the path of the file to get the path components
  const pathComponents = file.split(path.sep);

  // Let's start by assuming the file path has no invalid components
  let fileIsValid = true;

  // Let's process all path components to look for invalid ones
  const processedPathComponents = pathComponents.map(pathComponent => {
    if (!isCamelOrPascalCase(pathComponent) || hasTwoConsecutiveUpperCaseLetters(pathComponent)) {
      fileIsValid = false;
      return red(pathComponent);
    }
    return pathComponent;
  });

  // If we encountered any invalid components for this file, we'll remember the file.
  if (!fileIsValid) {
    filesInViolation.push(processedPathComponents.join(path.sep));
  }
});

// We're done looking through files.
//
// So, did we have any files in violation?
if (filesInViolation.length > 0) {
  // Yes, inform the user and exit with 1
  console.log(`\n${underline('The file names below need to be camelCase:')}\n`);

  filesInViolation.forEach(file => {
    console.log(`• ${file}`);
  });

  shelljs.exit(1);
} else {
  // No, exit with 0
  console.info('All checked files are camelCased');
  shelljs.exit(0);
}
