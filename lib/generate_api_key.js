const Chance = require('chance');
const { v4: uuidv4, v5: uuidv5 } = require('uuid');
const { randomBytes } = require('crypto');
const { base32 } = require('rfc4648');
const baseX = require('base-x');

// Character pools.
const LOWER_POOL = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUM_POOL = '0123456789';
const SPECIAL_POOL = '-._~+/';

// Create the combined character pool.
const CHARS_POOL = `${LOWER_POOL}${UPPER_POOL}${NUM_POOL}${SPECIAL_POOL}`;
// Create the Base62 character pool.
const BASE62_POOL = `${NUM_POOL}${LOWER_POOL}${UPPER_POOL}`;

// Helper function for checking for a string value.
const isString = (value) => {
  return (typeof value === 'string' || value instanceof String);
};

// Helper function for checking for a natural number.
const isNaturalNum = (value) => {
  // Check the type.
  if (typeof value !== 'number') {
    return false;
  } else {
    if (value >= 0.0) {
      return (Math.floor(value) === value) && value !== Infinity;
    }

    return false;
  }
};

// Helper function for getting the options.
const getOptions = (options, defaults) => {
  Object.keys(defaults).forEach((key) => {
    // Assign the value if not already set.
    if (options[key] === undefined) {
      options[key] = defaults[key];
    }
  });

  return options;
};

/**
 * Creates an API key using random bytes.
 *
 * @param {Object} options API key options.
 * @returns {String} The API key.
 */
function _getCryptoApiKey(options) {
  let totalBytes = 16;
  let apiKey;

  // Get the options.
  options = getOptions(options, { min: 16, max: 32 });

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
}

/**
 * Creates an API key using random string generation.
 *
 * @param {Object} options API key options.
 * @returns {String} The API key.
 */
function _getRandomStringApiKey(options) {
  // Get the options.
  options = getOptions(options, { min: 16, max: 32, pool: CHARS_POOL });

  // Get a 'Chance' instance.
  const chance = new Chance();

  // Generate the string.
  return chance.string({
    length: options.length || undefined,
    min: options.min,
    max: options.max,
    pool: options.pool,
  });
}

/**
 * Creates an API key using Base32 Crockford encoding.
 *
 * @param {Object} options API key options.
 * @returns {String} The API key.
 */
function _getBase32CrockfordApiKey(options) {
  // Get the options.
  options = getOptions(options, { dashes: true });

  // Create the uuid options.
  const v4options = {
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
    `${uuidParts[3]}${uuidParts[4].substr(0, 4)}`,
    uuidParts[4].substr(4),
  ];

  let apiKey = '';

  // Iterate through each part.
  partsArr.forEach((value) => {
    // Get every two characters.
    const valueArr = value.match(/.{1,2}/g);

    // Convert each value into a number.
    const numArr = valueArr.map((item) => Number(`0x${item}`));

    // Create the string.
    const base32Str = base32.stringify(numArr, { pad: false });

    // Check if we should add dashes
    if (options.dashes) {
      if (apiKey.length === 0) {
        apiKey += base32Str;
      } else {
        apiKey += `-${base32Str}`;
      }
    } else {
      apiKey += base32Str;
    }
  });

  return apiKey;
}

/**
 * Creates an API key using Base62 encoding.
 *
 * @returns {String} The API key.
 */
function _getBase62ApiKey() {
  // Create the uuid options.
  const v4options = {
    random: randomBytes(16),
  };

  // Set the encoding alphabet for Base62.
  const base62 = baseX(BASE62_POOL);

  // Create a new UUID.
  const uuid = uuidv4(v4options);
  // Create the UUID buffer.
  const uuidBuffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');

  // Generate the API key.
  const apiKey = base62.encode(uuidBuffer);

  return apiKey;
}

/**
 * Creates an API key using random UUID Version 4 generation.
 *
 * @param {Object} options API key options.
 * @returns {String} The API key.
 */
function _getUuidV4ApiKey(options) {
  // Get the options.
  options = getOptions(options, { dashes: true });

  // Create the uuid options.
  const v4options = {
    random: randomBytes(16),
  };

  // Generate the API key.
  const apiKey = uuidv4(v4options);

  // Check if we should remove dashes.
  if (!options.dashes) {
    return apiKey.replace(/-/g, '');
  }

  return apiKey;
}

/**
 * Creates an API key using random UUID Version 5 generation.
 *
 * @param {Object} options API key options.
 * @returns {String} The API key.
 */
function _getUuidV5ApiKey(options) {
  // Get the options.
  options = getOptions(options, { dashes: true });

  let namespace;

  if (!isString(options.name)) {
    throw new TypeError(`The required 'name' option must be a string.`);
  }

  // Check of batch processing. If so, create a namespace UUID.
  if (options.batch) {
    // Create the uuid options.
    const v4options = {
      random: randomBytes(16),
    };

    // Generate a namespace UUID.
    namespace = uuidv4(v4options);
  } else {
    if (!isString(options.namespace)) {
      throw new TypeError(`The required 'namespace' option must be a string.`);
    }

    namespace = options.namespace;
  }

  // Generate the API key.
  const apiKey = uuidv5(options.name, namespace);

  // Check if we should remove dashes.
  if (!options.dashes) {
    return apiKey.replace(/-/g, '');
  }

  return apiKey;
}

/**
 * Generates a simple API key based on the provided
 * generation method.
 *
 * @param {Object} options The API key generation options.
 * @returns {String|Array<String>} The API key or array of API keys.
 */
function generateApiKey(options = {}) {
  // Get the generation method.
  const genMethod = options.method || 'string';

  // Check for batch generation.
  if (options.batch) {
    if (!isNaturalNum(options.batch) || options.batch === 0) {
      throw new TypeError(`The 'batch' option must be a natural number > 0.`);
    }
  }

  // An object literal for creating the API key.
  const getApiKey = (method) => ({
    bytes: () => _getCryptoApiKey(options),
    string: () => _getRandomStringApiKey(options),
    base32: () => _getBase32CrockfordApiKey(options),
    base62: () => _getBase62ApiKey(),
    uuidv4: () => _getUuidV4ApiKey(options),
    uuidv5: () => _getUuidV5ApiKey(options),
    default: () => {
      throw new Error('Received an unknown API key generation method.');
    },
  })[method];

  // Check for batch generation.
  if (options.batch) {
    const apiKeys = [];

    for (let i = 0; i < options.batch; i++) {
      // Generate the API key.
      let apiKey = (getApiKey(genMethod) || getApiKey('default'))();

      // Add a prefix if necessary.
      if (options.prefix) {
        apiKey = `${options.prefix}.${apiKey}`;
      }

      // Add the key to the array.
      apiKeys.push(apiKey);
    }

    return apiKeys;
  } else {
    // Generate the API key.
    const apiKey = (getApiKey(genMethod) || getApiKey('default'))();

    // Add a prefix if necessary.
    if (options.prefix) {
      return `${options.prefix}.${apiKey}`;
    }

    return apiKey;
  }
}

module.exports = generateApiKey;
