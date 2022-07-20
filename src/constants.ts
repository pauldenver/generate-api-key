// Character pools.
const LOWER_CHAR_POOL = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_CHAR_POOL = LOWER_CHAR_POOL.toUpperCase();
const NUMBER_CHAR_POOL = '0123456789';
const SPECIAL_CHAR_POOL = '-._~+/';

/**
 * The default character pool that is used
 * when generating an API key.
 */
export const DEFAULT_CHARACTER_POOL = [
  ...LOWER_CHAR_POOL,
  ...UPPER_CHAR_POOL,
  ...NUMBER_CHAR_POOL,
  ...SPECIAL_CHAR_POOL,
].join('');

/**
 * Base62 character pool.
 */
export const BASE62_CHAR_POOL = [
  ...NUMBER_CHAR_POOL,
  ...LOWER_CHAR_POOL,
  ...UPPER_CHAR_POOL,
].join('');

/**
 * The default minimum length for an API key.
 */
export const DEFAULT_MIN_LENGTH = 16;

/**
 * The default maximum length for an API key.
 */
export const DEFAULT_MAX_LENGTH = 32;