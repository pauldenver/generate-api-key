## Changelog  

All notable changes to this project will be documented in this file.  

## [v1.0.2](https://github.com/pauldenver/generate-api-key/compare/v1.0.1...v1.0.2)

### Bug Fixes

*  Updated how the key length is determined when using the `bytes` method ([#3](https://github.com/pauldenver/generate-api-key/issues/3)).
*  Fixed a typo in the `chance.natural` usage in the `string` method.

## [v1.0.1](https://github.com/pauldenver/generate-api-key/compare/v1.0.0...v1.0.1)

### Features

*  Converted the project from JavaScript to TypeScript (also addresses [#1](https://github.com/pauldenver/generate-api-key/issues/1)).
*  Updated module dependencies to their current versions.

### Minor changes

*  Removed the `codecov` NPM module dependency and its associated NPM script. The module has been deprecated.
*  Added config files for `mocha` and `nyc`.

### Breaking changes

*  Updated the supported Node.js engine to versions 14 or greater.

## [v1.0.0](https://github.com/pauldenver/generate-api-key/commit/730c8b2a99d66fa68fb199161422d990228a1161)

*  Initial `generate-api-key` library release.