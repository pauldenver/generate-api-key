"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.isNaturalNum = exports.isString = void 0;
/**
 * Checks for a string value.
 *
 * @param value The value to check.
 * @returns Whether the value is a string or not.
 */
const isString = (value) => {
    return (typeof value === 'string' || value instanceof String);
};
exports.isString = isString;
/**
 * Checks for a natural number.
 *
 * @param value The value to check.
 * @returns Whether the value is a natural number or not.
 */
const isNaturalNum = (value) => {
    // Check the type.
    if (typeof value !== 'number') {
        return false;
    }
    else {
        return (value >= 0.0)
            ? (Math.floor(value) === value) && value !== Infinity
            : false;
    }
};
exports.isNaturalNum = isNaturalNum;
/**
 * Gets the options for the generation method. Uses
 * default values if certain options are missing.
 *
 * @param options The provided options.
 * @param defaults The default options.
 * @returns The modified options.
 */
const getOptions = (options, defaults) => {
    return Object.assign({}, defaults, options);
};
exports.getOptions = getOptions;
//# sourceMappingURL=utils.js.map