`@hollowverse/common`
=================================================================

This repository contains shared configuration files, utility functions and code quality scripts used across multiple [Hollowverse](https://github.com/hollowverse) repositories.

## Configuration Files
`common` currently includes configuration files for:

* TypeScript ([`tsconfig.json`](./tsconfig.json))
* TSLint ([`tslint.json`](./tslint.json))
* ESLint ([`.eslintrc.json`](./.eslintrc.json))
* Stylelint ([`.stylelintrc`](./.stylelintrc))

### How to use the shared configuration

1. Install this package as dependency of your project using the [GitHub URL](https://github.com/hollowverse/common).
     
     ```bash
     yarn add https://github.com/hollowverse/common --dev
     # or
     npm install https://github.com/hollowverse/common --save-dev
     ```
2. Install the [peer dependencies](./package.json#L7) for each of the tools used in the new project.
3. Extend your project configuration files with the corresponding files from this package. For example, here is how to extend `tsconfig.json`:
    
    ```json
    {
      "extends": "./node_modules/common/tsconfig.json"
    }
    ```
   Refer to each tool's documentation for more information on how to extend the configuration.
4. Add properties to the configuration file to override the shared configuration as needed.

## Helper Functions
In addition to shared configuration files, `common` also provides a set of utility functions used in multiple repositories in the Hollowverse organization for deployment and other tasks:

* [`decryptScripts`](./helpers/decryptScripts.js): Decrypts sensitive AES-256-CBC encrypted files using OpenSSL.
* [`executeCommands`](./helpers/executeCommands.js): A helper function that executes shell commands or JavaScript functions.
* [`retryCommand`](./helpers/retryCommand.js): Retries a JS or shell command multiple times before giving up.
* [`writeEnvFile`](./helpers/writeEnvFile.js): Writes a JSON file that contains various information about App Engine configuration, including the branch name.

Refer to the (`deploy.js`)[https://github.com/hollowverse/hollowverse/tree/master/deploy.s] script of [hollowverse/hollowverse](https://github.com/hollowverse/hollowverse) for examples on how to use these functions.

## Code Quality Checks

### `validate-file-names`
To enforce a consistent file naming conventions, `common` exports a validation script that checks and reports file names that do not match the naming convention we use at Hollowverse.

Once this package is installed, the script can be called using the following command:

```
yarn validate-file-names
```
