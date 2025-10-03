import { hash } from 'expo-argon2';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, PaperProvider, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [password, setPassword] = useState('');
  const [salt, setSalt] = useState('');
  const [result, setResult] = useState('');

  return (
    <PaperProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 16,
          alignContent: 'space-evenly',
        }}
      >
        <View style={{ gap: 8 }}>
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            mode="outlined"
            label="Salt"
            value={salt}
            onChangeText={setSalt}
          />
          <Button
            mode="contained"
            onPress={async () => {
              const hashed = hash(password, salt);
              setResult(hashed.encoded);
            }}
          >
            Hash
          </Button>
          <Button
            mode="contained"
            onPress={async () => Clipboard.setStringAsync(result)}
          >
            Copy hash
          </Button>
          <Text variant="bodyLarge">{result ?? ''}</Text>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}
