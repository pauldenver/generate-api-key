# generate-api-key  

[![GitHub package.json version (branch)][version-image]][npm-url]
[![unit tests][tests-image]][tests-url]
[![Build Status][travis-image]][travis-url]
[![coverage][coverage-image]][coverage-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![CodeFactor][codefactor-image]][codefactor-url]  


`generate-api-key` is a library for generating random API (Application Programming Interface) 
keys or access tokens. By using this library, a Node.js backend service can generate API keys 
or access tokens, then issue them to users and/or other services that require access to the 
capabilities and resources provided by the API service.  


## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Generation Methods](#generation-methods)
- [Options](#options)
  - [`string` Method](#string-method)
  - [`bytes` Method](#bytes-method)
  - [`base32` Method](#base32-method)
  - [`base62` Method](#base62-method)
  - [`uuidv4` Method](#uuidv4-method)
  - [`uuidv5` Method](#uuidv5-method)
- [Security](#security)
- [Change Log](#change-log)
- [License](#license)  
<br />

## Installation

Using NPM:

```bash
$ npm install generate-api-key
```

Using Yarn:

```bash
$ yarn add generate-api-key
```
<br />

## Usage

The `generate-api-key` library can generate API key/access tokens by utilizing several 
generation methods, such as `string`, `bytes`, `base32`, `base62`, `uuidv4`, and 
`uuidv5`. The `string` method is used by default.  
<br />

Importing:  

```javascript
// CommonJS Import
const { generateApiKey } = require('generate-api-key');
// OR
const generateApiKey = require('generate-api-key').default;

// ES6 Import
import { generateApiKey } from 'generate-api-key';
// OR
import generateApiKey from 'generate-api-key';
```

Example:

```javascript
import generateApiKey from 'generate-api-key';

// Generate the API key.
generateApiKey(); // ⇨ 'q_EaTiX+xbBXLyO05.+zDXjI+Qi_X0v'
```
<br />

### Generation Methods

| Method   |  Description                                                           |
| -------- | ---------------------------------------------------------------------- | 
| `string` | Creates an API key/access token using random string generation         |
| `bytes`  | Creates an API key/access token using random bytes                     |
| `base32` | Creates an API key/access token using a random UUID and converting it<br />into a [Douglas Crockford Base32](https://en.wikipedia.org/wiki/Base32#Crockford's_Base32) encoded string  |
| `base62` | Creates an API key using Base62 encoding                               |
| `uuidv4` | Creates an API key/access token using random UUID Version 4 generation |
| `uuidv5` | Creates an API key/access token using random UUID Version 5 generation |
<br />

## Options

### `string` Method  

Creates an API key/access token using random string generation.  

| Name     | Default Value |  Description                                                      |
| ---------| ------------- | ----------------------------------------------------------------- | 
| `method` | `string`      | To use the `string` generation method                             |
| `min`    | `16`          | The minimum length of the API key (ignored if `length` is given)  |
| `max`    | `32`          | The maximum length of the API key (ignored if `length` is given)  |
| `length` | `undefined`   | The length of the API key                                         |
| `pool`   | `abcdefghijklmnopqrstuvwxyz`<br />`ABCDEFGHIJKLMNOPQRSTUVWXYZ`<br />`0123456789-._~+/` | The characters used for the API key generation | 
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`  | `undefined`   | The number of API keys to generate                                |
<br />

Examples:  

```javascript
import generateApiKey from 'generate-api-key';

// Generate the API key. The 'string' method is used by default.
generateApiKey(); // ⇨ 'q_EaTiX+xbBXLyO05.+zDXjI+Qi_X0v'

// Provide the generation method.
generateApiKey({ method: 'string' }); // ⇨ 'Zt1HbMcLKxk6~nnW'

// Create an API key with a certain length.
generateApiKey({ method: 'string', length: 8 }); // ⇨ 'TNJ6-Lo4'

// Create an API key with a length between a certain range.
generateApiKey({ method: 'string', min: 10, max: 20 }); // ⇨ 'ENwiOFdP8cWj'

// Create an API key with a certain pool of characters.
generateApiKey({
  method: 'string',
  pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
}); // ⇨ 'QFLSGIDLOUAELQZTQXMHQNJ'

// Create an API key with a prefix.
generateApiKey({ method: 'string', prefix: 'test_app' }); // ⇨ 'test_app.aTd34Rli0nir70/8'

// Create a batch (certain amount) of API keys.
generateApiKey({ method: 'string', batch: 5 }); // ⇨ 
  // [
  //   'w05KkI9AWhKxzvPFtXotUva-',
  //   'YFL0ICl4PtLD8Y/oQ20iyAE',
  //   'vJFbfeP_cpMYsH9l5BVHY23Ss',
  //   '29~LIlSjDYFr5OrhU3f',
  //   'UQc8Tp1d9elWAh7KDIMkjz2moFs'
  // ]
```
<br />

### `bytes` Method  

Creates an API key/access token using random bytes.  

| Name     | Default Value |  Description                                                      |
| ---------| ------------- | ----------------------------------------------------------------- | 
| `method` | `bytes`       | To use the `bytes` generation method                              |
| `min`    | `16`          | The minimum length of the API key (ignored if `length` is given)  |
| `max`    | `32`          | The maximum length of the API key (ignored if `length` is given)  |
| `length` | `undefined`   | The length of the API key                                         |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`  | `undefined`   | The number of API keys to generate                                |
<br />

Examples:  

```javascript
import generateApiKey from 'generate-api-key';

// Provide the generation method.
generateApiKey({ method: 'bytes' }); // ⇨ '6f31bfc3717d63e7bd21'

// Create an API key with a certain length.
generateApiKey({ method: 'bytes', length: 12 }); // ⇨ '47a8dcbc79f6'

// Create an API key with a length between a certain range.
generateApiKey({ method: 'bytes', min: 12, max: 25 }); // ⇨ 'fae27c801b5092bc'

// Create an API key with a prefix.
generateApiKey({ method: 'bytes', prefix: 'test_app' }); // ⇨ 'test_app.8daaa6b26c79030db1a1448261'

// Create a batch (certain amount) of API keys.
generateApiKey({ method: 'bytes', batch: 5 }); // ⇨ 
  // [
  //   '0d5a87f007aae092a6',
  //   '96a62b4438d82645506b',
  //   'abd4e4199311fb1e2a818a4a',
  //   'ddbb04b2375ba050cb506e89df',
  //   '2ee3db86329865d8'
  // ]
```
<br />

### `base32` Method  

Creates an API key/access token using a random UUID and converting it into a [Douglas Crockford Base32](https://en.wikipedia.org/wiki/Base32#Crockford's_Base32) encoded string.  

| Name     | Default Value |  Description                                                      |
| ---------| ------------- | ----------------------------------------------------------------- | 
| `method` | `base32`      | To use the `base32` generation method                             |
| `dashes` | `true`        | Add dashes (`-`) to the API key or not                            |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`  | `undefined`   | The number of API keys to generate                                |
<br />

Examples:  

```javascript
import generateApiKey from 'generate-api-key';

// Provide the generation method.
generateApiKey({ method: 'base32' }); // ⇨ '2NOLH5I-43EEK7A-R6YRK3I-BRCIQNQ'

// Create an API key without the dashes.
generateApiKey({ method: 'base32', dashes: false }); // ⇨ 'MPZ6G2QTAXUGBYTCLKEGYZG6UXAY'

// Create an API key with a prefix.
generateApiKey({ method: 'base32', prefix: 'test_app' }); // ⇨ 'test_app.PMKC6DQ-2LZECPY-RVRF6YI-INGIEMQ'

// Create a batch (certain amount) of API keys.
generateApiKey({ method: 'base32', batch: 5 }); // ⇨ 
  // [
  //   'EGIKGTI-PTLUW7I-QBLUBNA-FH4P2EI',
  //   'MOHE7XQ-DRKEQ4I-RO6JVDQ-GIJRLKA',
  //   'UDVJBFI-JFTUWYA-XE4YCBA-FUYXQBY',
  //   '22EFRQI-2AWULDI-QE2PUCY-MXG36RI',
  //   '42CXULQ-SDPU6ZA-RQ6QPBQ-4BMZCOA'
  // ]
```
<br />

### `base62` Method  

Creates an API key using Base62 encoding.  

| Name     | Default Value |  Description                                                      |
| ---------| ------------- | ----------------------------------------------------------------- | 
| `method` | `base62`      | To use the `base62` generation method                             |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`  | `undefined`   | The number of API keys to generate                                |
<br />

Examples:  

```javascript
import generateApiKey from 'generate-api-key';

// Provide the generation method.
generateApiKey({ method: 'base62' }); // ⇨ '2AEmXhHtNJkIAqL1S3So6G'

// Create an API key with a prefix.
generateApiKey({ method: 'base62', prefix: 'test_app' }); // ⇨ 'test_app.1aHVuwNwzITpzJWl40OPvx'

// Create a batch (certain amount) of API keys.
generateApiKey({ method: 'base62', batch: 5 }); // ⇨ 
  // [
  //   '1kCFJsoNBpnX65k84Y8clk',
  //   '5rAZLlhh9pQuV6weF2RxGg',
  //   '4kBS1ciuLadz340qeXQGl6',
  //   '3DXocnIyt236ymZAHWYOs6',
  //   'oPv07XcusmLM1UsHniMZy'
  // ]
```
<br />

### `uuidv4` Method  

Creates an API key/access token using random UUID Version 4 generation.  

| Name     | Default Value |  Description                                                      |
| ---------| ------------- | ----------------------------------------------------------------- | 
| `method` | `uuidv4`      | To use the `uuidv4` generation method                             |
| `dashes` | `true`        | Add dashes (`-`) to the API key or not                            |
| `prefix` | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`  | `undefined`   | The number of API keys to generate                                |
<br />

Examples:  

```javascript
import generateApiKey from 'generate-api-key';

// Provide the generation method.
generateApiKey({ method: 'uuidv4' }); // ⇨ 'c40c974f-307e-490e-8d4e-0c8f31f21df3'

// Create an API key without the dashes.
generateApiKey({ method: 'uuidv4', dashes: false }); // ⇨ 'be1748535cad474191b34a4aa4299a9d'

// Create an API key with a prefix.
generateApiKey({ method: 'uuidv4', prefix: 'test_app' }); // ⇨ 'test_app.1dfdf2c1-7365-4625-b7d9-d9db5210f18d'

// Create a batch (certain amount) of API keys.
generateApiKey({ method: 'uuidv4', batch: 5 }); // ⇨ 
  // [
  //   'd822611a-0600-4edf-9697-21ba5c79e6d7',
  //   '596ac0ae-c4a0-4803-b796-8f239c8431ba',
  //   '0f3819f3-b417-4c4c-b674-853473800265',
  //   '882332bf-4215-41ce-a573-a3c8f5d47a24',
  //   'f269c1f6-77d5-464d-8229-769c0b3a21f7'
  // ]
```
<br />

### `uuidv5` Method  

Creates an API key/access token using random UUID Version 5 generation.  

| Name         | Default Value |  Description                                                      |
| -------------| ------------- | ----------------------------------------------------------------- | 
| `method`     | `uuidv5`      | To use the `uuidv5` generation method                             |
| `name`       | `undefined`   | A unique name to use for the generation                           |
| `namespace`  | `undefined`   | The UUID to use for the generation (ignored if `batch` is given)  |
| `dashes`     | `true`        | Add dashes (`-`) to the API key or not                            |
| `prefix`     | `undefined`   | A string prefix for the API key, followed by a period (`.`)       |  
| `batch`      | `undefined`   | The number of API keys to generate                                |
<br />

Examples:  

```javascript
import generateApiKey from 'generate-api-key';

// Provide the generation method with the name and namespace.
generateApiKey({
  method: 'uuidv5',
  name: 'production app',
  namespace: '1dfdf2c1-7365-4625-b7d9-d9db5210f18d'
}); // ⇨ 'd683c168-377f-528d-8d9a-b7f1551ecb44'

// Create an API key without the dashes.
generateApiKey({
  method: 'uuidv5',
  name: 'production app',
  namespace: '596ac0ae-c4a0-4803-b796-8f239c8431ba',
  dashes: false
}); // ⇨ 'b1bc2cda0c1f5eb594495088a37339b8'

// Create an API key with a prefix.
generateApiKey({
  method: 'uuidv5',
  name: 'production app',
  namespace: '0f3819f3-b417-4c4c-b674-853473800265',
  prefix: 'prod_app'
}); // ⇨ 'prod_app.3f7e5d98-3aa9-5dcb-82e3-10d9a2fc412a'

/* 
 * Create a batch (certain amount) of API keys. When creating a
 * batch of 'uuidv5' API keys, a namespace is generated for each
 * key. The provided namespace is not used.
 */
generateApiKey({
  method: 'uuidv5',
  name: 'production app',
  batch: 5
}); // ⇨ 
  // [
  //   '1e37088a-4dbf-5126-a255-071095e3a53b',
  //   '23c3cfce-2cf1-5b80-856c-12cf6b5f4e88',
  //   '46ec193e-237e-517b-a02e-7679510215d8',
  //   'cf646907-7bc7-5953-bf76-b7527d70b234',
  //   '5ead0c39-0eac-57e8-831d-250932aeb1e0'
  // ]
```
<br />

## Security  

When generating and storing API keys and access tokens please be mindful of secure 
database storage best practices. The reason API keys or access tokens are stored is to 
confirm the key/token that is provided (ex. HTTP request) is valid and issued by your 
organization or application (the same as a password). Just like a password, an API key 
or access token can provide direct access to data or services that require authentication.

To authenticate an API key or access token, it is not necessary to know the raw 
key/token value, the key/token just needs to validated to be correct. API keys and 
access tokens should not be stored in plain text in your database, they should be 
stored as a hashed value. Consider using database storage concepts such as salting 
or peppering during the hashing process. 

Lastly, if you suspect the API credentials for your organization or application have 
been compromised, please revoke the keys and regenerate new keys.  
<br />

## Change Log

The [CHANGELOG](./CHANGELOG.md) contains descriptions of notable changes.  
<br />

## License

This software is licensed under the [Apache 2 license](./LICENSE).  

[npm-url]: https://www.npmjs.com/package/generate-api-key
[version-image]: https://img.shields.io/github/package-json/v/pauldenver/generate-api-key/main?label=version&style=flat-square
[tests-url]: https://github.com/pauldenver/generate-api-key/actions/workflows/test.yml
[tests-image]: https://github.com/pauldenver/generate-api-key/actions/workflows/test.yml/badge.svg?branch=main
[coverage-url]: https://github.com/pauldenver/generate-api-key/actions/workflows/coverage.yml
[coverage-image]: https://github.com/pauldenver/generate-api-key/actions/workflows/coverage.yml/badge.svg?branch=main
[travis-url]: https://travis-ci.com/pauldenver/generate-api-key
[travis-image]: https://travis-ci.com/pauldenver/generate-api-key.svg?branch=main
[coveralls-url]: https://coveralls.io/github/pauldenver/generate-api-key
[coveralls-image]: https://coveralls.io/repos/github/pauldenver/generate-api-key/badge.svg?branch=main
[codefactor-url]: https://www.codefactor.io/repository/github/pauldenver/generate-api-key/overview/main
[codefactor-image]: https://www.codefactor.io/repository/github/pauldenver/generate-api-key/badge/main