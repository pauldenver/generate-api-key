import {
  expectType,
  expectNotType,
  expectAssignable,
  expectNotAssignable
} from 'tsd';
import {
  generateApiKey,
  generationMethods,
  GenerationMethod,
  ApiKeyResults,
  StringGenerationOptions,
  BytesGenerationOptions,
  Base32GenerationOptions,
  Base62GenerationOptions,
  UuidV4GenerationOptions,
  UuidV5GenerationOptions
} from '../../src';

// Check the generation methods.
generationMethods.forEach((m) => expectType<GenerationMethod>(m));

expectNotType<GenerationMethod>('other');

// Check the 'string' generation methods.
expectAssignable<StringGenerationOptions>({
  method: 'string'
});

expectAssignable<StringGenerationOptions>({
  method: 'string',
  length: 25
});

expectAssignable<StringGenerationOptions>({
  method: 'string',
  prefix: 'test',
  min: 8,
  max: 32
});

expectAssignable<StringGenerationOptions>({
  method: 'string',
  length: 25,
  pool: 'ABCDEFGHI',
  batch: 5,
  prefix: 'test',
  min: 8,
  max: 24,
});

expectNotAssignable<StringGenerationOptions>({
  method: 'string',
  dashes: true
});

// Check the 'bytes' generation methods.
expectAssignable<BytesGenerationOptions>({
  method: 'bytes'
});

expectAssignable<BytesGenerationOptions>({
  method: 'bytes',
  length: 10
});

expectAssignable<BytesGenerationOptions>({
  method: 'bytes',
  length: 10,
  prefix: 'test',
  batch: 2
});

expectNotAssignable<BytesGenerationOptions>({
  method: 'bytes',
  pool: 'ABCDEFGHI'
});

// Check the 'base32' generation methods.
expectAssignable<Base32GenerationOptions>({
  method: 'base32'
});

expectAssignable<Base32GenerationOptions>({
  method: 'base32',
  dashes: true
});

expectAssignable<Base32GenerationOptions>({
  method: 'base32',
  dashes: false,
  prefix: 'test',
  batch: 5
});

expectNotAssignable<Base32GenerationOptions>({
  method: 'base32',
  length: 12
});

// Check the 'base62' generation methods.
expectAssignable<Base62GenerationOptions>({
  method: 'base62'
});

expectAssignable<Base62GenerationOptions>({
  method: 'base62',
  prefix: 'test',
  batch: 4
});

expectNotAssignable<Base62GenerationOptions>({
  method: 'base62',
  max: 15
});

// Check the 'uuidv4' generation methods.
expectAssignable<UuidV4GenerationOptions>({
  method: 'uuidv4'
});

expectAssignable<UuidV4GenerationOptions>({
  method: 'uuidv4',
  dashes: true
});

expectAssignable<UuidV4GenerationOptions>({
  method: 'uuidv4',
  dashes: false,
  prefix: 'test',
  batch: 8
});

expectNotAssignable<UuidV4GenerationOptions>({
  method: 'uuidv4',
  min: 5
});

// Check the 'uuidv5' generation methods.
expectAssignable<UuidV5GenerationOptions>({
  method: 'uuidv5',
  name: 'Testing',
  namespace: 'UUID'
});

expectAssignable<UuidV5GenerationOptions>({
  method: 'uuidv5',
  name: 'Testing',
  namespace: 'UUID',
  dashes: true
});

expectAssignable<UuidV5GenerationOptions>({
  method: 'uuidv5',
  name: 'Testing',
  namespace: 'UUID',
  dashes: true,
  prefix: 'test',
  batch: 3
});

expectNotAssignable<UuidV5GenerationOptions>({
  method: 'uuidv5',
  name: 'Testing',
  namespace: 'UUID',
  pool: 'ABCDEFGHI'
});

expectAssignable<ApiKeyResults>('some-key');
expectAssignable<ApiKeyResults>([ 'key1', 'key2' ]);
expectNotAssignable<ApiKeyResults>(8743);

// Check the generation results.
expectType<ApiKeyResults>(generateApiKey())

generationMethods.forEach((m) => {
  expectType<ApiKeyResults>(generateApiKey({ method: m }));
});