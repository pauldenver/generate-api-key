module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'google',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'valid-jsdoc': [ 'error',
      {
        requireParamDescription: false,
        requireReturnDescription: false,
        requireReturn: false,
        prefer: { returns: 'returns' },
      },
    ],
    'max-len': [ 'error',
      {
        code: 85,
        tabWidth: 2,
        ignoreUrls: true,
      },
    ],
    'object-curly-spacing': [ 'error', 'always' ],
    'indent': [
      'error', 2, {
        CallExpression: {
          arguments: 'off',
        },
      },
    ],
  },
};
