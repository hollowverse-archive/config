// @ts-check

const shelljs = require('shelljs');
const minimatch = require('minimatch');
const path = require('path');

// Regex that defines our file and directory naming convention
const camelCasedFileNameRegex = /^[.]?([a-z])+([0-9]|[a-zA-Z]|[.])*$/;

// Files and directories that are exempt from the naming convention
let ignoredFilesAndDirectories = [];

try {
  ignoredFilesAndDirectories = require(`${process.cwd()}/validateFileNames.js`);
} catch (e) {
  ignoredFilesAndDirectories = [
    'README.md',
    'Dockerfile',
    'LICENSE.md',
    'customTypings/*',
    'typings/*',
  ];
}

// Get the list of files that we're interested in validating
const files = getFiles();

// Create a place to store files in violation of naming convention
const filesInViolation = [];

// Now let's go through the files to see if they violate the naming convention
files.forEach(file => {
  // Split the path of the file to get the path components
  const pathComponents = file.split(path.sep);

  // Let's start by assuming the file path has no invalid components
  let fileIsValid = true;

  // Let's process all path components to look for invalid ones
  const processedPathComponents = pathComponents.map(pathComponents => {
    if (!isCamelCase(pathComponents)) {
      fileIsValid = false;

      return red(pathComponents);
    } else {
      return pathComponents;
    }
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
  shelljs.exit(0);
}

function getFiles() {
  // Let's only validate files managed by git
  const files = shelljs.exec('git ls-files', { silent: true });

  return files.split('\n').filter(file => {
    // remove empty strings from the array and remove files in ignored paths
    return file.length !== 0 && !isIgnored(file);
  });
}
function isCamelCase(filePathComponent) {
  return camelCasedFileNameRegex.test(filePathComponent);
}
function isIgnored(filePath) {
  return ignoredFilesAndDirectories.some(ignoredFileOrDirectory => {
    return minimatch(filePath, ignoredFileOrDirectory, { matchBase: true });
  });
}
function red(text) {
  return `\x1b[31m${text}\x1b[0m`;
}
function underline(text) {
  return `\x1b[4m${text}\x1b[0m`;
}
