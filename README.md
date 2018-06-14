# `@hollowverse/config` [![Build Status](https://travis-ci.org/hollowverse/config.svg?branch=master)](https://travis-ci.org/hollowverse/config)

This repository contains shared configuration files used across multiple [Hollowverse](https://github.com/hollowverse) repositories.

## Configuration Files

`@hollowverse/config` currently includes configuration files for:

* TypeScript ([`tsconfig.json`](./tsconfig.json))
* TSLint ([`tslint.json`](./tslint.json))
* ESLint ([`.eslintrc.json`](./.eslintrc.json), other language-specific configurations in [`./eslint`](./eslint))
* Stylelint ([`.stylelintrc`](./.stylelintrc))
* Prettier ([`prettier.config.js`](./prettier.config.js))
* Babel ([`lambda/.babelrc`](./lambda/.babelrc) for AWS Lambda)

### How to use the shared configuration

1.  Install this package as dependency of your project:
    ```bash
    yarn add @hollowverse/config --dev
    # or
    npm install @hollowverse/config --save-dev
    ```
2.  Install the [peer dependencies](./package.json#L31) for each of the tools used in the new project.
3.  Extend your project configuration files with the corresponding files from this package. For example, here is how to extend `tsconfig.json`:
    ```json
    {
      "extends": "./node_modules/@hollowverse/config/tsconfig.json"
    }
    ```
    Refer to each tool's documentation for more information on how to extend the configuration.
4.  Add properties to the configuration file to override the shared configuration as needed.

---

[If you'd like to tell us something, or need help with anything...](https://github.com/hollowverse/hollowverse/wiki/Help)
