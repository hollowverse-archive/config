Common configurations for Hollowverse repos
=============================================

This repository contains shared configuration files used across multiple [Hollowverse](https://github.com/hollowverse) repositories.

It currently includes configuration files for:

* TypeScript ([`tsconfig.json`](./tsconfig.json))
* TSLint ([`tslint.json`](./tslint.json))
* ESLint ([`.eslintrc.json`](./.eslintrc.json))
* Stylelint ([`.stylelintrc`](./.stylelintrc))

## How to use the shared configuration

1. Install this package as dependency of your project using the [GitHub URL](https://github.com/hollowverse/common-config).
     
     ```bash
     yarn add https://github.com/hollowverse/common-config --dev
     # or
     npm install https://github.com/hollowverse/common-config --save-dev
     ```
2. Install the [peer dependencies](./package.json#L7) for each of the tools used in the new project.
3. Extend your project configuration files with the corresponding files from this package. For example, here is how to extend `tsconfig.json`:
    
    ```json
    {
      "extends": "./node_modules/common-config/tsconfig.json"
    }
    ```
   Refer to each tool's documentation for more information on how to extend the configuration.
4. Add properties to the configuration file to override the shared configuration as needed.

