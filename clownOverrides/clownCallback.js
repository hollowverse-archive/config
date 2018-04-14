const path = require('path');
const _ = require('lodash'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = function clownCallback(clownFs) {
  const filePathByBaseName = baseName =>
    Object.keys(clownFs.fileContents).find(
      filePath => path.basename(filePath) === baseName,
    );

  ['.commitlintrc.json', '.eslintrc.json', '.releaserc.json'].forEach(
    fileName => {
      clownFs.editJson(filePathByBaseName(fileName), json => {
        _.remove(json.extends, value => value.startsWith('./node_modules'));

        return json;
      });
    },
  );

  clownFs.editJson(filePathByBaseName('package.json'), json => {
    _.remove(json['lint-staged']['**/*.js{x,}'], value =>
      value.endsWith('eslint'),
    );

    return json;
  });
};
