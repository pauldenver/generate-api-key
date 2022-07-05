import Chance from 'chance';
import {
  v4 as uuidv4,
  v5 as uuidv5,
  validate as validateUUID,
  V4Options
} from 'uuid';
import { randomBytes } from 'crypto';
import { base32 } from 'rfc4648';
import baseX from 'base-x';
import {
  generationMethods,
  GenerationMethod,
  GenerationOptions,
  ApiKeyResults,
  StringGenerationOptions,
  BytesGenerationOptions,
  Base32GenerationOptions,
  UuidV4GenerationOptions,
  UuidV5GenerationOptions
} from './types';
import {
  isString,
  isNaturalNum,
  getOptions
} from './utils';
import {
  DEFAULT_CHARACTER_POOL,
  BASE62_CHAR_POOL,
  DEFAULT_MIN_LENGTH,
  DEFAULT_MAX_LENGTH
} from './constants';

/**
 * Creates an API key using random bytes.
 *
 * @param options API key options.
 * @returns The API key.
 */
const getCryptoApiKey = (options: BytesGenerationOptions): string => {
  let totalBytes: number;
  let apiKey: string;

  // Get the options.
  options = getOptions(options, {
    min: DEFAULT_MIN_LENGTH,
    max: DEFAULT_MAX_LENGTH,
  });

  // Get a 'Chance' instance.
  const chance = new Chance();

  if (options.length) {
    totalBytes = Math.ceil(options.length / 2);
  } else {
    // Get a random number.
    const numVal = chance.natural({ min: options.min, max: options.max });
    // Set the total bytes.
    totalBytes = Math.ceil(numVal / 2);
  }

  // Generate the API key.
  apiKey = randomBytes(totalBytes).toString('hex');

  // Check the key length.
  if (options.length && (apiKey.length > options.length)) {
    const endIndex = apiKey.length - (apiKey.length - options.length);
    apiKey = apiKey.slice(0, endIndex);
  } else if (apiKey.length > options.max) {
    const endIndex = apiKey.length - (apiKey.length - options.max);
    apiKey = apiKey.slice(0, endIndex);
  }

  return apiKey;
};

/**
 * Creates an API key using random string generation.
 *
 * @param options API key options.
 * @returns The API key.
 */
const getRandomStringApiKey = (options: StringGenerationOptions): string => {
  // Get the options.
  options = getOptions(options, {
    min: DEFAULT_MIN_LENGTH,
    max: DEFAULT_MAX_LENGTH,
    pool: DEFAULT_CHARACTER_POOL,
  });

  // Get a 'Chance' instance.
  const chance = new Chance();

  // Determine the length for the key.
  const length = options.length ?? chance.natural({
    min: options.min,
    max: options.min
  });

  // Generate the string.
  return chance.string({ length, pool: options.pool });
};

/**
 * Creates an API key using Base32 Crockford encoding.
 *
 * @param options API key options.
 * @returns The API key.
 */
const getBase32CrockfordApiKey = (options: Base32GenerationOptions): string => {
  // Get the options.
  options = getOptions(options, { dashes: true });

  // Create the uuid options.
  const v4options: V4Options = {
    random: randomBytes(16),
  };

  // Create a new UUID.
  const uuid = uuidv4(v4options);
  // Split at the dashes.
  const uuidParts = uuid.split('-');

  // Convert the UUID into 4 equally separate parts.
  const partsArr = [
    uuidParts[0],
    `${uuidParts[1]}${uuidParts[2]}`,
    `${uuidParts[3]}${uuidParts[4].substring(0, 4)}`,
    uuidParts[4].substring(4),
  ];

  // Iterate through each part.
  const apiKeyArr: string[] = partsArr.map((value: string) => {
    // Get every two characters.
    const valueArr = value.match(/.{1,2}/g);
    // Convert each value into a number.
    const numArr = valueArr.map((item) => Number(`0x${item}`));
    // Create the string.
    return base32.stringify(numArr, { pad: false });
  });

  // Check if we should add dashes.
  return (options.dashes) ? apiKeyArr.join('-') : apiKeyArr.join('');
};

/**
 * Creates an API key using Base62 encoding.
 *
 * @returns The API key.
 */
const getBase62ApiKey = (): string => {
  // Create the uuid options.
  const v4options: V4Options = {
    random: randomBytes(16),
  };

  // Set the encoding alphabet for Base62.
  const base62: baseX.BaseConverter = baseX(BASE62_CHAR_POOL);

  // Create a new UUID.
  const uuid = uuidv4(v4options);
  // Create the UUID buffer.
  const uuidBuffer: Uint8Array = Buffer.from(uuid.replace(/-/g, ''), 'hex');

  // Generate the API key.
  return base62.encode(uuidBuffer);
};

/**
 * Creates an API key using random UUID Version 4 generation.
 *
 * @param options API key options.
 * @returns The API key.
 */
const getUuidV4ApiKey = (options: UuidV4GenerationOptions): string => {
  // Get the options.
  options = getOptions(options, { dashes: true });

  // Create the uuid options.
  const v4options: V4Options = {
    random: randomBytes(16),
  };

  // Generate the API key.
  const apiKey = uuidv4(v4options);

  // Check if we should remove dashes.
  return (!options.dashes) ? apiKey.replace(/-/g, '') : apiKey;
}

/**
 * Creates an API key using random UUID Version 5 generation.
 *
 * @param options API key options.
 * @returns The API key.
 */
const getUuidV5ApiKey = (options: UuidV5GenerationOptions): string => {
  // Get the options.
  options = getOptions(options, { dashes: true });

  if (!isString(options.name)) {
    throw new TypeError(`The required 'name' option must be a string.`);
  }

  if (!options.batch) {
    if (!isString(options.namespace)) {
      throw new TypeError(`The required 'namespace' option must be a string.`);
    }

    if (!validateUUID(options.namespace)) {
      throw new Error(`The required 'namespace' option must be a valid UUID.`);
    }
  }

  // Create the uuid options.
  const v4options: V4Options = {
    random: randomBytes(16),
  };

  /*
   * Get the namespace. When using batch processing
   * create a namespace UUID. A namespace must be unique.
   */
  const namespace: string = (options.batch)
    ? uuidv4(v4options)
    : options.namespace;

  // Generate the API key.
  const apiKey = uuidv5(options.name, namespace);

  // Check if we should remove dashes.
  return (!options.dashes) ? apiKey.replace(/-/g, '') : apiKey;
}

/**
 * Generates a simple API key or a batch of API keys based on 
 * the provided generation method.
 *
 * @param options The API key generation options.
 * @returns The API key or array of API keys.
 */
export const generateApiKey = (options: GenerationOptions = {}): ApiKeyResults => {
  // Get the generation method.
  const genMethod: GenerationMethod = options.method ?? 'string';

  // Check for a valid generation method.
  if (!generationMethods.includes(genMethod)) {
    throw new Error('Received an unknown API key generation method.');
  }

  // Check for batch generation.
  if (options.batch) {
    if (!isNaturalNum(options.batch)) {
      throw new TypeError(`The 'batch' option must be a natural number > 0.`);
    }
  } else if (options.batch === 0) {
    throw new TypeError(`The 'batch' option must be a natural number > 0.`);
  }

  // An object literal for creating the API key.
  const getApiKey = (method: GenerationMethod) => ({
    base62: () => getBase62ApiKey(),
    base32: () => getBase32CrockfordApiKey(options as Base32GenerationOptions),
    bytes: () => getCryptoApiKey(options as BytesGenerationOptions),
    string: () => getRandomStringApiKey(options as StringGenerationOptions),
    uuidv4: () => getUuidV4ApiKey(options as UuidV4GenerationOptions),
    uuidv5: () => getUuidV5ApiKey(options as UuidV5GenerationOptions),
  })[method];

  // Check for batch generation.
  if (options.batch) {
    // Generate the keys.
    const apiKeys: string[] = [ ...Array(options.batch) ].map(() => {
      // Generate the API key.
      const apiKey = getApiKey(genMethod)();

      // Add a prefix if necessary.
      return (options.prefix)
        ? `${options.prefix}.${apiKey}`
        : apiKey;
    });

    return apiKeys;
  } else {
    // Generate the API key.
    const apiKey: string = getApiKey(genMethod)();
    // Add a prefix if necessary.
    return (options.prefix) ? `${options.prefix}.${apiKey}` : apiKey;
  }
}

export default generateApiKey;