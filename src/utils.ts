import { GenerationOptions, DefaultGenerationOptions } from './types';

/**
 * Checks for a string value.
 * 
 * @param value The value to check.
 * @returns Whether the value is a string or not.
 */
export const isString = (value: any): boolean => {
  return (typeof value === 'string' || value instanceof String);
};

/**
 * Checks for a natural number.
 * 
 * @param value The value to check.
 * @returns Whether the value is a natural number or not.
 */
export const isNaturalNum = (value: any): boolean => {
  // Check the type.
  if (typeof value !== 'number') {
    return false;
  } else {
    return (value >= 0.0)
      ? (Math.floor(value) === value) && value !== Infinity
      : false;
  }
};

/**
 * Gets the options for the generation method. Uses
 * default values if certain options are missing.
 * 
 * @param options The provided options.
 * @param defaults The default options.
 * @returns The modified options.
 */
export const getOptions = (
  options: GenerationOptions,
  defaults: DefaultGenerationOptions
): GenerationOptions => {
  return Object.assign({}, defaults, options);
};