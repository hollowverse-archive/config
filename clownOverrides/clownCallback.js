const _ = require('lodash'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = function clownCallback(clownFs) {
  ['.commitlintrc.json', '.eslintrc.json', '.releaserc.json'].forEach(
    fileName => {
      clownFs.editJson(fileName, json => {
        _.remove(json.extends, value => value.startsWith('./node_modules'));

        return json;
      });
    },
  );

  clownFs.editJson('package.json', json => {
    _.remove(json['lint-staged']['**/*.js{x,}'], value =>
      value.endsWith('eslint'),
    );

    delete json.devDependencies.eslint; // eslint-disable-line no-param-reassign

    return json;
  });
};
