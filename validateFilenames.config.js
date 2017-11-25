module.exports = {
  rules: [
    {
      validation: 'camelCase',
      patterns: ['**/*'],
    },

    {
      validation: 'ignore',
      patterns: [
        '*/**/typings/*',
        'Dockerfile*',
        'docker-compose.yml',
        '**/LICENSE.md',
        '**/README.md',
      ],
    },
  ],
};
