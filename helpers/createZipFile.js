const glob = require('glob');
const JsZip = require('jszip');
const flatten = require('lodash/flatten');
const fs = require('fs');

/**
 * Compresses all files that match an array of glob patterns into a ZIP file written to the
 * specified path.
 * The contents of the ZIP file will have the same folder structure of the matched files, with
 * the root of the file matching the current working directory.
 * @param {string} path The full path where the ZIP file will be saved, including the
 * filename and extension
 * @param {string[]} patterns Glob patterns of files to include in the ZIP file
 * @param {string[] | undefined} ignore Patterns of files to ignore
 */
module.exports = function createZipFile(path, patterns, ignore = undefined) {
  const files = flatten(
    patterns.map(pattern => glob.sync(pattern, { nodir: true, ignore })),
  );
  const zipFile = new JsZip();

  files.forEach(file =>
    zipFile.file(file, fs.createReadStream(file), { createFolders: true }),
  );

  return new Promise((resolve, reject) => {
    zipFile
      .generateNodeStream({ streamFiles: true, type: 'nodebuffer' })
      .pipe(fs.createWriteStream(path))
      .on('finish', resolve)
      .on('error', reject);
  });
};
