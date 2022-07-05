import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { existsSync } from 'fs';
import {
  DEFAULT_CHARACTER_POOL,
  BASE62_CHAR_POOL
} from '../src/constants';

// Check what we are testing.
const shouldTestBuild = (
  process.env.TEST_BUILD
  && existsSync(path.resolve(__dirname, '../dist/index.js'))
);

/*
 * Determine if we are testing the Typescript files
 * or the JavaScript build.
 */
const { generateApiKey } = shouldTestBuild
  ? require('../dist/index')
  : require('../src');

describe('generateApiKey', () => {
  context(`'bytes' method`, () => {
    it('should create an API key with the default options', () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'bytes' });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf.within(16, 32);
    });

    it('should create an API key with a set length', () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'bytes', length: 10 });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf(10);
    });

    it('should create an API key with an uneven set length', () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'bytes', length: 7 });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf(7);
    });

    it(`should create an API key with a length within the 'min' and 'max' range`, () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'bytes', min: 5, max: 15 });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf.within(5, 15);
    });

    it(`should create an API key with an uneven 'min' and 'max' range`, () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'bytes', min: 15, max: 15 });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf(15);
    });
  });

  context(`'string' method`, () => {
    it('should create an API key with the default options', () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'string' });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf.within(16, 32);
      [ ...apiKey ].forEach((c) => expect(DEFAULT_CHARACTER_POOL).to.include(c));
    });

    it('should create an API key with a set length', () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'string', length: 15 });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf(15);
      [ ...apiKey ].forEach((c) => expect(DEFAULT_CHARACTER_POOL).to.include(c));
    });

    it(`should create an API key with a length within the 'min' and 'max' range`, () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'string', min: 10, max: 25 });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf.within(10, 25);
      [ ...apiKey ].forEach((c) => expect(DEFAULT_CHARACTER_POOL).to.include(c));
    });
  });

  context(`'base32' method`, () => {
    it('should create an API key with the default options', () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'base32' });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf(31);
      expect(apiKey).to.match(/[A-Z0-9]{7}-[A-Z0-9]{7}-[A-Z0-9]{7}-[A-Z0-9]{7}/);
    });

    it('should create an API key without dashes', () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'base32', dashes: false });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf(28);
      expect(apiKey).to.match(/[A-Z0-9]{28}/);
    });
  });

  context(`'base62' method`, () => {
    it('should create an API key', () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'base62' });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf.at.most(22);
      [ ...apiKey ].forEach((c) => expect(BASE62_CHAR_POOL).to.include(c));
    });
  });

  context(`'uuidv4' method`, () => {
    it('should create an API key with the default options', () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'uuidv4' });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf(36);
      expect(apiKey).to.match(
        /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
      );
    });

    it('should create an API key without dashes', () => {
      // Create the API key.
      const apiKey = generateApiKey({ method: 'uuidv4', dashes: false });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf(32);
      expect(apiKey).to.match(/[0-9a-fA-F]{32}/);
    });
  });

  context(`'uuidv5' method`, () => {
    it('should create an API key with the default options', () => {
      // Create the API key.
      const apiKey = generateApiKey({
        method: 'uuidv5',
        name: 'Super secret',
        namespace: uuidv4(),
      });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf(36);
      expect(apiKey).to.match(
        /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
      );
    });

    it('should create API keys with a created namespace in batch mode', () => {
      // Create the API keys.
      const apiKeys = generateApiKey({
        method: 'uuidv5',
        name: 'Super secret',
        batch: 2,
      }) as string[];

      expect(apiKeys).to.be.an('array');
      expect(apiKeys).to.have.lengthOf(2);

      apiKeys.forEach((key) => {
        expect(key).to.be.a('string');
        expect(key).to.have.lengthOf(36);
        expect(key).to.match(
          /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
        );
      });
    });

    it('should create an API key without dashes', () => {
      // Create the API key.
      const apiKey = generateApiKey({
        method: 'uuidv5',
        name: 'Super secret',
        namespace: uuidv4(),
        dashes: false,
      });
      
      expect(apiKey).to.be.a('string');
      expect(apiKey).to.have.lengthOf(32);
      expect(apiKey).to.match(/[0-9a-fA-F]{32}/);
    });

    it(`should throw an error for an invalid 'name' value`, () => {
      expect(() => generateApiKey({
        method: 'uuidv5',
        namespace: uuidv4(),
      })).to.throw(TypeError, `The required 'name' option must be a string.`);

      expect(() => generateApiKey({
        method: 'uuidv5',
        // @ts-ignore: "name" expects a string.
        name: 102,
        namespace: uuidv4(),
      })).to.throw(TypeError, `The required 'name' option must be a string.`);
    });

    it(`should throw an error for an invalid 'namespace' value`, () => {
      expect(() => generateApiKey({
        method: 'uuidv5',
        name: 'Very special',
      })).to.throw(TypeError, `The required 'namespace' option must be a string.`);

      expect(() => generateApiKey({
        method: 'uuidv5',
        name: 'Very special',
        // @ts-ignore: "namespace" expects a string.
        namespace: {},
      })).to.throw(TypeError, `The required 'namespace' option must be a string.`);

      expect(() => generateApiKey({
        method: 'uuidv5',
        name: 'Very special',
        namespace: 'not a valid uuid',
      })).to.throw(Error, `The required 'namespace' option must be a valid UUID.`);
    });
  });

  it('should create an API key with a prefix', () => {
    // Create the API key.
    const apiKey = generateApiKey({ method: 'string', prefix: 'app' }) as string;
    
    expect(apiKey).to.be.a('string');
    expect(apiKey.startsWith('app.')).to.be.true;
    expect(apiKey.replace(/^app\./, '')).to.have.lengthOf.within(16, 32);
    [ ...apiKey.replace(/^app\./, '') ].forEach((c) => expect(DEFAULT_CHARACTER_POOL).to.include(c));
  });

  it(`should create an API key using the 'string' method when not provided`, () => {
    // Create the API key.
    const apiKey = generateApiKey();
    
    expect(apiKey).to.be.a('string');
    expect(apiKey).to.have.lengthOf.within(16, 32);
    [ ...apiKey ].forEach((c) => expect(DEFAULT_CHARACTER_POOL).to.include(c));
  });

  it(`should throw an error for an invalid 'method' value`, () => {
    expect(() => generateApiKey({
      // @ts-ignore: "method" expects a string.
      method: 99,
    })).to.throw(Error, 'Received an unknown API key generation method.');

    expect(() => generateApiKey({
      // @ts-ignore: "method" expects a valid method value.
      method: 'other',
      batch: 8,
    })).to.throw(Error, 'Received an unknown API key generation method.');
  });

  it('should generate a batch of API keys', () => {
    // Create the API keys.
    const apiKeys = generateApiKey({ method: 'string', batch: 10 }) as string[];
    
    expect(apiKeys).to.be.an('array');
    expect(apiKeys).to.have.lengthOf(10);

    apiKeys.forEach((key) => {
      expect(key).to.be.a('string');
      expect(key).to.have.lengthOf.within(16, 32);
      [ ...key ].forEach((c) => expect(DEFAULT_CHARACTER_POOL).to.include(c));
    });
  });

  it('should generate a batch of API keys with a prefix', () => {
    // Create the API keys.
    const apiKeys = generateApiKey({
      method: 'string',
      batch: 5,
      prefix: 'test'
    }) as string[];
    
    expect(apiKeys).to.be.an('array');
    expect(apiKeys).to.have.lengthOf(5);

    apiKeys.forEach((key) => {
      expect(key).to.be.a('string');
      expect(key.startsWith('test.')).to.be.true;
      expect(key.replace(/^test\./, '')).to.have.lengthOf.within(16, 32);
      [ ...key.replace(/^test\./, '') ].forEach((c) => expect(DEFAULT_CHARACTER_POOL).to.include(c));
    });
  });

  it(`should throw an error for an invalid 'batch' value`, () => {
    expect(() => generateApiKey({
      method: 'string',
      batch: 4.25,
    })).to.throw(TypeError, `The 'batch' option must be a natural number > 0.`);

    expect(() => generateApiKey({
      method: 'string',
      batch: -5,
    })).to.throw(TypeError, `The 'batch' option must be a natural number > 0.`);

    expect(() => generateApiKey({
      method: 'string',
      batch: 0,
    })).to.throw(TypeError, `The 'batch' option must be a natural number > 0.`);


    expect(() => generateApiKey({
      method: 'string',
      // @ts-ignore: "batch" expects a number.
      batch: [],
    })).to.throw(TypeError, `The 'batch' option must be a natural number > 0.`);
  });
});