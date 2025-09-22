import { NativeModule, requireNativeModule } from 'expo';

declare class ExpoArgon2Module extends NativeModule {
  /**
   * Hashes a password using the Argon2 algorithm.
   * @param password The password to hash.
   * @param salt A unique salt for the password.
   * @param options parameters for the hashing process. Defaults to timeCost=3, memoryCost=4096, parallelism=1, hashLength=32, type='argon2id'.
   * @returns An object containing the raw hash, encoded hash, and hex representation of the hash.
   */
  hash(
    password: string,
    salt: string,
    options?: {
      timeCost?: number; // default 3
      memoryCost?: number; // default 4096
      parallelism?: number; // default 1
      hashLength?: number; // default 32
      type?: 'argon2d' | 'argon2i' | 'argon2id'; // default 'argon2id'
    },
  ): {
    raw: Uint8Array;
    encoded: string;
    hex: string;
  };
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoArgon2Module>('ExpoArgon2');
