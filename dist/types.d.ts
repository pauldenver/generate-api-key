export declare const generationMethods: readonly ["string", "bytes", "base32", "base62", "uuidv4", "uuidv5"];
/**
 * Generation methods for key/token generation.
 */
export declare type GenerationMethod = (typeof generationMethods)[number];
/**
 * API key base generation options.
 */
interface __BaseGenerationOptions {
    method?: GenerationMethod;
    prefix?: string;
    batch?: number;
}
/**
 * Generation options for the "string" method.
 */
export interface StringGenerationOptions extends __BaseGenerationOptions {
    min?: number;
    max?: number;
    length?: number;
    pool?: string;
}
/**
 * Generation options for the "bytes" method.
 */
export interface BytesGenerationOptions extends __BaseGenerationOptions {
    min?: number;
    max?: number;
    length?: number;
}
/**
 * Generation options for the "base32" method.
 */
export interface Base32GenerationOptions extends __BaseGenerationOptions {
    dashes?: boolean;
}
/**
 * Generation options for the "base62" method.
 */
export declare type Base62GenerationOptions = __BaseGenerationOptions;
/**
 * Generation options for the "uuidv4" method.
 */
export interface UuidV4GenerationOptions extends __BaseGenerationOptions {
    dashes?: boolean;
}
/**
 * Generation options for the "uuidv5" method.
 */
export interface UuidV5GenerationOptions extends __BaseGenerationOptions {
    name?: string;
    namespace?: string;
    dashes?: boolean;
}
/**
 * API key/token generation options.
 */
export declare type GenerationOptions = StringGenerationOptions | BytesGenerationOptions | Base32GenerationOptions | Base62GenerationOptions | UuidV4GenerationOptions | UuidV5GenerationOptions;
/**
 * Default generation options.
 */
export interface DefaultGenerationOptions {
    min?: number;
    max?: number;
    pool?: string;
    dashes?: boolean;
}
/**
 * Results from the API key/token generation.
 */
export declare type ApiKeyResults = string | string[];
export {};
//# sourceMappingURL=types.d.ts.map