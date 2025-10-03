import ExpoArgon2Module from './ExpoArgon2Module';

export async function hash(
  password: string | Uint8Array,
  salt: string | Uint8Array,
  options?: {
    timeCost?: number;
    memoryCost?: number;
    parallelism?: number;
    hashLength?: number;
    type?: 'argon2d' | 'argon2i' | 'argon2id';
  },
) {
  password = toUint8Array(password);
  salt = toUint8Array(salt);

  return ExpoArgon2Module.hash(password, salt, options);
}

function toUint8Array(input: string | Uint8Array): Uint8Array {
  if (input instanceof Uint8Array) {
    return input;
  }

  return new TextEncoder().encode(input);
}
