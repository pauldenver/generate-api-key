"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiKey = void 0;
const chance_1 = __importDefault(require("chance"));
const uuid_1 = require("uuid");
const crypto_1 = require("crypto");
const rfc4648_1 = require("rfc4648");
const base_x_1 = __importDefault(require("base-x"));
const types_1 = require("./types");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
/**
 * Creates an API key using random bytes.
 *
 * @param options API key options.
 * @returns The API key.
 */
const getCryptoApiKey = (options) => {
    var _a;
    let apiKey;
    // Get the options.
    options = (0, utils_1.getOptions)(options, {
        min: constants_1.DEFAULT_MIN_LENGTH,
        max: constants_1.DEFAULT_MAX_LENGTH,
    });
    // Get a 'Chance' instance.
    const chance = new chance_1.default();
    // Determine the length for the key.
    const length = (_a = options.length) !== null && _a !== void 0 ? _a : chance.natural({
        min: options.min,
        max: options.max
    });
    // Set the total bytes.
    const totalBytes = Math.ceil(length / 2);
    // Generate the API key.
    apiKey = (0, crypto_1.randomBytes)(totalBytes).toString('hex');
    // Check the key length.
    if (apiKey.length > length) {
        const endIndex = apiKey.length - (apiKey.length - length);
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
const getRandomStringApiKey = (options) => {
    var _a;
    // Get the options.
    options = (0, utils_1.getOptions)(options, {
        min: constants_1.DEFAULT_MIN_LENGTH,
        max: constants_1.DEFAULT_MAX_LENGTH,
        pool: constants_1.DEFAULT_CHARACTER_POOL,
    });
    // Get a 'Chance' instance.
    const chance = new chance_1.default();
    // Determine the length for the key.
    const length = (_a = options.length) !== null && _a !== void 0 ? _a : chance.natural({
        min: options.min,
        max: options.max
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
const getBase32CrockfordApiKey = (options) => {
    // Get the options.
    options = (0, utils_1.getOptions)(options, { dashes: true });
    // Create the uuid options.
    const v4options = {
        random: (0, crypto_1.randomBytes)(16),
    };
    // Create a new UUID.
    const uuid = (0, uuid_1.v4)(v4options);
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
    const apiKeyArr = partsArr.map((value) => {
        // Get every two characters.
        const valueArr = value.match(/.{1,2}/g);
        // Convert each value into a number.
        const numArr = valueArr.map((item) => Number(`0x${item}`));
        // Create the string.
        return rfc4648_1.base32.stringify(numArr, { pad: false });
    });
    // Check if we should add dashes.
    return (options.dashes) ? apiKeyArr.join('-') : apiKeyArr.join('');
};
/**
 * Creates an API key using Base62 encoding.
 *
 * @returns The API key.
 */
const getBase62ApiKey = () => {
    // Create the uuid options.
    const v4options = {
        random: (0, crypto_1.randomBytes)(16),
    };
    // Set the encoding alphabet for Base62.
    const base62 = (0, base_x_1.default)(constants_1.BASE62_CHAR_POOL);
    // Create a new UUID.
    const uuid = (0, uuid_1.v4)(v4options);
    // Create the UUID buffer.
    const uuidBuffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');
    // Generate the API key.
    return base62.encode(uuidBuffer);
};
/**
 * Creates an API key using random UUID Version 4 generation.
 *
 * @param options API key options.
 * @returns The API key.
 */
const getUuidV4ApiKey = (options) => {
    // Get the options.
    options = (0, utils_1.getOptions)(options, { dashes: true });
    // Create the uuid options.
    const v4options = {
        random: (0, crypto_1.randomBytes)(16),
    };
    // Generate the API key.
    const apiKey = (0, uuid_1.v4)(v4options);
    // Check if we should remove dashes.
    return (!options.dashes) ? apiKey.replace(/-/g, '') : apiKey;
};
/**
 * Creates an API key using random UUID Version 5 generation.
 *
 * @param options API key options.
 * @returns The API key.
 */
const getUuidV5ApiKey = (options) => {
    // Get the options.
    options = (0, utils_1.getOptions)(options, { dashes: true });
    if (!(0, utils_1.isString)(options.name)) {
        throw new TypeError(`The required 'name' option must be a string.`);
    }
    if (!options.batch) {
        if (!(0, utils_1.isString)(options.namespace)) {
            throw new TypeError(`The required 'namespace' option must be a string.`);
        }
        if (!(0, uuid_1.validate)(options.namespace)) {
            throw new Error(`The required 'namespace' option must be a valid UUID.`);
        }
    }
    // Create the uuid options.
    const v4options = {
        random: (0, crypto_1.randomBytes)(16),
    };
    /*
     * Get the namespace. When using batch processing
     * create a namespace UUID. A namespace must be unique.
     */
    const namespace = (options.batch)
        ? (0, uuid_1.v4)(v4options)
        : options.namespace;
    // Generate the API key.
    const apiKey = (0, uuid_1.v5)(options.name, namespace);
    // Check if we should remove dashes.
    return (!options.dashes) ? apiKey.replace(/-/g, '') : apiKey;
};
/**
 * Generates a simple API key or a batch of API keys based on
 * the provided generation method.
 *
 * @param options The API key generation options.
 * @returns The API key or array of API keys.
 */
const generateApiKey = (options = {}) => {
    var _a;
    // Get the generation method.
    const genMethod = (_a = options.method) !== null && _a !== void 0 ? _a : 'string';
    // Check for a valid generation method.
    if (!types_1.generationMethods.includes(genMethod)) {
        throw new Error('Received an unknown API key generation method.');
    }
    // Check for batch generation.
    if (options.batch) {
        if (!(0, utils_1.isNaturalNum)(options.batch)) {
            throw new TypeError(`The 'batch' option must be a natural number > 0.`);
        }
    }
    else if (options.batch === 0) {
        throw new TypeError(`The 'batch' option must be a natural number > 0.`);
    }
    // An object literal for creating the API key.
    const getApiKey = (method) => ({
        base62: () => getBase62ApiKey(),
        base32: () => getBase32CrockfordApiKey(options),
        bytes: () => getCryptoApiKey(options),
        string: () => getRandomStringApiKey(options),
        uuidv4: () => getUuidV4ApiKey(options),
        uuidv5: () => getUuidV5ApiKey(options),
    })[method];
    // Check for batch generation.
    if (options.batch) {
        // Generate the keys.
        const apiKeys = [...Array(options.batch)].map(() => {
            // Generate the API key.
            const apiKey = getApiKey(genMethod)();
            // Add a prefix if necessary.
            return (options.prefix)
                ? `${options.prefix}.${apiKey}`
                : apiKey;
        });
        return apiKeys;
    }
    else {
        // Generate the API key.
        const apiKey = getApiKey(genMethod)();
        // Add a prefix if necessary.
        return (options.prefix) ? `${options.prefix}.${apiKey}` : apiKey;
    }
};
exports.generateApiKey = generateApiKey;
exports.default = exports.generateApiKey;
//# sourceMappingURL=generate_api_key.js.map