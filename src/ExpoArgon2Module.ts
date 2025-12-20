import { NativeModule, requireNativeModule } from 'expo';

export interface Argon2Options {
  /**
   * Defaults to 3
   */
  timeCost?: number;
  /**
   * Defaults to 4096
   */
  memoryCost?: number;
  /**
   * Defaults to 1
   */
  parallelism?: number;
  /**
   * Defaults to 32
   */
  hashLength?: number;
  /**
   * Defaults to 'argon2id'
   */
  type?: 'argon2d' | 'argon2i' | 'argon2id';
}

export interface Argon2Result {
  /**
   * Raw hash bytes
   */
  raw: Uint8Array;
  /**
   * Argon2-style encoded hash
   */
  encoded: string;
  /**
   * Hash bytes, hex-encoded
   */
  hex: string;
}

declare class ExpoArgon2Module extends NativeModule {
  /**
   * Hashes a password using the Argon2 algorithm.
   * @param password The password to hash.
   * @param salt A unique salt for the password.
   * @param options parameters for the hashing process. Defaults to timeCost=3, memoryCost=4096, parallelism=1, hashLength=32, type='argon2id'.
   * @returns An object containing the raw hash, encoded hash, and hex representation of the hash.
   */
  hash(
    password: Uint8Array,
    salt: Uint8Array,
    options?: Argon2Options,
  ): Argon2Result;

  /**
   * Asynchronously hashes a password using the Argon2 algorithm.
   * @param password The password to hash.
   * @param salt A unique salt for the password.
   * @param options parameters for the hashing process. Defaults to timeCost=3, memoryCost=4096, parallelism=1, hashLength=32, type='argon2id'.
   * @returns A promise resolving to an object containing the raw hash, encoded hash, and hex representation of the hash.
   */
  hashAsync(
    password: Uint8Array,
    salt: Uint8Array,
    options?: Argon2Options,
  ): Promise<Argon2Result>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoArgon2Module>('ExpoArgon2');
