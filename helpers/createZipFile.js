const glob = require('glob');
const JSZip = require('jszip');
const flatten = require('lodash/flatten');
const fs = require('fs');

/**
 * Compresses all files that match an array of glob patterns into a ZIP file written to the
 * specified path.
 * The contents of the ZIP file will have the same folder structure of the specified patterns, with
 * the root of the file matching the current working directory.
 * @param {string} path The full path where the ZIP file will be saved, including the
 * @param {string[]} patterns Glob patterns of files to include in the ZIP file.
 * filename and extension
 */
module.exports = async function createZipFile(path, patterns) {
  const files = flatten(patterns.map(pattern => glob.sync(pattern)));
  const zipFile = new JSZip();

  files.forEach(file => zipFile.file(file, fs.createReadStream(file)));

  return new Promise((resolve, reject) => {
    zipFile
      // @ts-ignore
      .generateNodeStream({ streamFiles: true, type: 'nodebuffer' })
      .pipe(fs.createWriteStream(path))
      .on('finish', resolve)
      .on('error', reject);
  });
};
