"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_MAX_LENGTH = exports.DEFAULT_MIN_LENGTH = exports.BASE62_CHAR_POOL = exports.DEFAULT_CHARACTER_POOL = void 0;
// Character pools.
const LOWER_CHAR_POOL = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_CHAR_POOL = LOWER_CHAR_POOL.toUpperCase();
const NUMBER_CHAR_POOL = '0123456789';
const SPECIAL_CHAR_POOL = '-._~+/';
/**
 * The default character pool that is used
 * when generating an API key.
 */
exports.DEFAULT_CHARACTER_POOL = [
    ...LOWER_CHAR_POOL,
    ...UPPER_CHAR_POOL,
    ...NUMBER_CHAR_POOL,
    ...SPECIAL_CHAR_POOL,
].join('');
/**
 * Base62 character pool.
 */
exports.BASE62_CHAR_POOL = [
    ...NUMBER_CHAR_POOL,
    ...LOWER_CHAR_POOL,
    ...UPPER_CHAR_POOL,
].join('');
/**
 * The default minimum length for an API key.
 */
exports.DEFAULT_MIN_LENGTH = 16;
/**
 * The default maximum length for an API key.
 */
exports.DEFAULT_MAX_LENGTH = 32;
//# sourceMappingURL=constants.js.map