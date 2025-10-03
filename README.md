# expo-argon2

Argon2 bindings for expo apps


## Usage

First install the package:
```bash
npm install expo-argon2
```

Then you can use it in your code like this:

```typescript
import { hash } from 'expo-argon2';

const hashedPassword = await hash('mypassword', 'random_salt', {
  timeCost: 3,
  memoryCost: 4096,
  parallelism: 1,
  hashLength: 32,
  type: 'argon2id',
});
console.log(hashedPassword);
```

For more details, see the example project in the `example` folder.

