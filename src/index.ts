import ExpoArgon2Module, {
  type Argon2Options,
  type Argon2Result,
} from './ExpoArgon2Module';

/**
 * Hashes a password using the Argon2 algorithm.
 * @param password The password to hash.
 * @param salt A unique salt for the password.
 * @param options parameters for the hashing process. Defaults to timeCost=3, memoryCost=4096, parallelism=1, hashLength=32, type='argon2id'.
 * @returns An object containing the raw hash, encoded hash, and hex representation of the hash.
 */
export function hash(
  password: string | Uint8Array,
  salt: string | Uint8Array,
  options: Argon2Options = {},
): Argon2Result {
  password = toUint8Array(password);
  salt = toUint8Array(salt);

  if (salt.byteLength < 8) {
    throw new Error('Salt for argon2 must be at least 8 bytes long');
  }

  return ExpoArgon2Module.hash(password, salt, options);
}

/**
 * Asynchronously hashes a password using the Argon2 algorithm.
 * @param password The password to hash.
 * @param salt A unique salt for the password.
 * @param options parameters for the hashing process. Defaults to timeCost=3, memoryCost=4096, parallelism=1, hashLength=32, type='argon2id'.
 * @returns A promise resolving to an object containing the raw hash, encoded hash, and hex representation of the hash.
 */
export function hashAsync(
  password: string | Uint8Array,
  salt: string | Uint8Array,
  options: Argon2Options = {},
): Promise<Argon2Result> {
  password = toUint8Array(password);
  salt = toUint8Array(salt);

  if (salt.byteLength < 8) {
    throw new Error('Salt for argon2 must be at least 8 bytes long');
  }

  return ExpoArgon2Module.hashAsync(password, salt, options);
}

function toUint8Array(input: string | Uint8Array): Uint8Array {
  if (input instanceof Uint8Array) {
    return input;
  }

  return new TextEncoder().encode(input);
}
