import { GenerationOptions, DefaultGenerationOptions } from './types';
/**
 * Checks for a string value.
 *
 * @param value The value to check.
 * @returns Whether the value is a string or not.
 */
export declare const isString: (value: any) => boolean;
/**
 * Checks for a natural number.
 *
 * @param value The value to check.
 * @returns Whether the value is a natural number or not.
 */
export declare const isNaturalNum: (value: any) => boolean;
/**
 * Gets the options for the generation method. Uses
 * default values if certain options are missing.
 *
 * @param options The provided options.
 * @param defaults The default options.
 * @returns The modified options.
 */
export declare const getOptions: (options: GenerationOptions, defaults: DefaultGenerationOptions) => GenerationOptions;
//# sourceMappingURL=utils.d.ts.map